import selectEl from "../components/copy";
import tutorial from "./../images/tutorial.MP4";
function CopyPage() {
  const details = window.GlobalDetails;
  return (
    <div id="copy">
      <div>
        <p id="header_copy">Детали вашего заказа:</p>
        <p>
          Проверьте введенные данные. После нажатия на кнопку подтвердить данные
          будут автоматически скопированы в буфер обмена, как только вы будете
          перенаправлены в чат с менеджером вставьте скопированное и отправьте
          нашему менеджеру.
        </p>
      </div>
      <textarea
        id="details"
        defaultValue={window.GlobalDetails}
        className="gray_input"
        style={{height:'auto', minHeight:'250px'}}
      ></textarea>

      <a
        href="https://t.me/archimolotok"
        style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
        onClick={selectEl}
      >
        <button className="gold_button" style={{ width: "100%" }}>
          Подтвердить
        </button>
      </a>
      <p className="video_guide">Видео гайд</p>
      <video
        src={tutorial}
        style={{
          borderRadius: "16px",
          border: "2px solid var(--Yellow-gradient, #f5ea99)",
          height:'400px'
        }}
        preload="auto"
        controls={true}
      ></video>
    </div>
  );
}
export default CopyPage;
