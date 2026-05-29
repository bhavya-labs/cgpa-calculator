function generateInputs() {

  const count = parseInt(document.getElementById("semesterCount").value);
  const sgpaInputs = document.getElementById("sgpaInputs");

  sgpaInputs.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    sgpaInputs.innerHTML += `
      <input 
        type="number" 
        step="0.01"
        min="0"
        max="10"
        placeholder="Enter Semester ${i} SGPA"
        class="sgpa"
      >
    `;
  }
}
