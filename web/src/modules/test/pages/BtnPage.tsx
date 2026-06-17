import {trackBtn } from "../../../analytics/events";

export function BtnPage() {
  return (
    <div style={{ maxWidth: 680, margin: "24px auto", padding: 16, fontFamily: "system-ui" }}>
      <h2>test</h2>

      <button id="applicationCompleteBtn001" onClick={() => {
        trackBtn({
          event: "application_event_001"
        });
      }} style={{ margin: "20px", padding: "10px 14px" }}>
        ボタン⓵
      </button>
      
      <button id="applicationCompleteBtn002" onClick={() => {
        trackBtn({
          event: "application_event_002"
        });
      }} style={{ margin: "20px", padding: "10px 14px" }}>
        ボタン⓶
      </button>
    </div>
  );
}