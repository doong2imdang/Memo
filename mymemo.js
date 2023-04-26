let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

function saveNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;


    allMemo.push({ title, content, len: allMemo.length });

    localStorage.setItem("allMemo", JSON.stringify(allMemo));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    
    render();
}

function editNote (id) {
    const itemToEdit = allMemo.find((item) => item.len === id);
    if (!itemToEdit) return;
  
    const newTitle = prompt("새로운 제목을 입력하세요.", itemToEdit.title);
    const newContent = prompt("새로운 내용을 입력하세요.", itemToEdit.content);
  
    if (newTitle && newContent) {
      itemToEdit.title = newTitle;
      itemToEdit.content = newContent;
      localStorage.setItem("allMemo", JSON.stringify(allMemo));
      render();
    }
  }

function render() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    // // 최신 게시물이 위로 올라오도록
    // for (let i = allMemo.length; i > 0 ; i--) {
    //     // 아래와 유사 코드
    // }

    for (const item of allMemo) {
        const saveTitle = document.createElement("h2");
        const saveContent = document.createElement("p");
        const saveId = document.createElement("p");
        const deleteMemoBtn = document.createElement("button");
        const editMemoBtn = document.createElement("button");

        saveTitle.textContent = item.title;
        saveContent.textContent = item.content;
        // saveId.textContent = item.len + 1;
        deleteMemoBtn.textContent = "삭제";
        deleteMemoBtn.setAttribute("id", item.len);
        deleteMemoBtn.setAttribute("onclick", "remove()");
        editMemoBtn.textContent = "수정";
        editMemoBtn.setAttribute("id", item.len);
        editMemoBtn.setAttribute("onclick", `editNote(${item.len})`);

        display.appendChild(saveId);
        display.appendChild(saveTitle);
        display.appendChild(saveContent);
        display.appendChild(editMemoBtn);
        display.appendChild(deleteMemoBtn);
    }
}

function remove() {
    // console.log(event.srcElement.id);
    // console.log(allMemo);
    const idx = allMemo.find(
        (item) => item.len == event.srcElement.id
    );
    if (idx) {
        allMemo.splice(
            allMemo.findIndex((item) => item.len == idx.len),
            1
        );
    }
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
}