export default function selectEl() {
  let a = document.getElementById("details");
  a.select();
  document.execCommand("copy");
}
