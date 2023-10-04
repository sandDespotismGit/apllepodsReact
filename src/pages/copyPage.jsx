import selectEl from "../components/copy";
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
      <input id="details" defaultValue={window.GlobalDetails} className="gray_input"></input>

      <a href="https://t.me/archimolotok" style={{ width: "100%", marginTop:'16px' }} onClick={selectEl}>
        <button className="gold_button" style={{ width: "100%" }}>
          Подтвердить
        </button>
      </a>
    </div>
  );
}
export default CopyPage;
