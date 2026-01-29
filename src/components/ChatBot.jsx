import React, { useEffect, useRef, useState } from 'react';

const N8N_CHAT_WEBHOOK = 'https://n8n.gwsapp.net/webhook/8f61c22c-0a61-4153-99e6-8f11c336c70d/chat'; 
// ^ Replace with the Production URL from the “When chat message received” node

function getOrCreateSessionId() {
  const key = 'n8n_chat_session_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I can answer FAQs, book consults, or create a ticket. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;

    const sessionId = getOrCreateSessionId();

    // Optimistically render user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    try {
      // Payload shape works well with n8n Chat Trigger
      const resp = await fetch(N8N_CHAT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Common fields: message, sessionId, and optionally user metadata
        body: JSON.stringify({
          message: text,
          sessionId,
          // You can also add: user: { name, email } if your downstream tools expect it
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => '');
        throw new Error(`n8n error ${resp.status}: ${errText}`);
      }

      // Some n8n chat flows stream. For simplicity, read as text then parse.
      // If your chat returns JSON, swap to resp.json()
      const contentType = resp.headers.get('content-type') || '';
      let assistantMessage = '';

      if (contentType.includes('application/json')) {
        const data = await resp.json();
        // Adjust if your Chat Trigger returns a different structure
        assistantMessage = data.reply ?? data.text ?? JSON.stringify(data);
      } else {
        assistantMessage = await resp.text();
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I hit an error reaching the assistant.' }
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ border: '1px solid #ddd', width: 380, height: 520, display: 'flex', flexDirection: 'column', borderRadius: 8 }}>
      <div ref={scrollerRef} style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 10px',
              borderRadius: 8,
              background: m.role === 'user' ? '#dfe9ff' : '#f3f4f6',
              whiteSpace: 'pre-wrap'
            }}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #eee', padding: 8 }}>
        <textarea
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={busy ? 'Working…' : 'Type a message…'}
          disabled={busy}
          style={{ width: '100%', resize: 'none', padding: 8 }}
        />
        <div style={{ textAlign: 'right', marginTop: 6 }}>
          <button onClick={sendMessage} disabled={busy || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}