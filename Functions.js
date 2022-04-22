
/*let i = 0;

function ShowAll(){


}



function done(){
    let j;
    let counter = 0;
    for(j = 1; j<=i; j++){
        const elem  = document.getElementById("listElem" + j.toString())
        if(elem.className == "finishedElem"){
            counter++;
            Render("done", "listElem" + j.toString());
        }

        else elem.style.visibility = "hidden";

    }
    document.getElementById("doneListElem").textContent = document.getElementById("doneListElem").textContent.split("-")[0] + "-" + counter.toString();
}

function inProgress(){

}

function changerList(curPos){
    let j = curPos + 1;
    if(curPos<i)
    {
        while(j<=i){
            const nextElem = document.getElementById("listElem" + j.toString())
            nextElem.id = "listElem" + curPos.toString();
            curPos++;
            j++;
        }
    }
    i--;
    document.getElementById("allListElem").textContent = document.getElementById("allListElem").textContent.split("-")[0] + "-" + i.toString();
}

function Render(){

}

function create(){
    i++;
    const node = document.createElement("li");
    const NumerOfPoint = document.createTextNode(i.toString() + '. ');
    const textLi = document.getElementById("textBoxEnter").value;
    const textNode = document.createTextNode(textLi);
    const newID = 'listElem' + i.toString();
    const butDel = document.createElement("button");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    butDel.textContent = 'X';
    butDel.setAttribute('style', ' top: 25px; ' +
        'height: 20px; ' +
        'width: 5%; right: 0' );
    document.getElementById("textBoxEnter").value = '';
    node.setAttribute("id", newID);
    node.style.fontSize = 'xx-large';
    node.appendChild(checkBox);
    node.appendChild(textNode);
    node.appendChild(butDel);
    node.setAttribute("class", "progressedElem");
    node.style.height = '50px';
    document.getElementById("ToDoList").appendChild(node);
    butDel.addEventListener("click", () => {
        changerList(parseInt( (NumerOfPoint.nodeValue.split('.')[0]),10));
        document.getElementById("ToDoList").removeChild(node);
    })
    checkBox.addEventListener("click", () => {
        if(checkBox.checked == true){
            node.setAttribute("class", "finishedElem");
        }
        else {
            node.setAttribute("class", "progressedElem");
        }
    })
    document.getElementById("allListElem").textContent = document.getElementById("allListElem").textContent.split("-")[0] + "-" + i.toString();
}*/

/*Сверху рабочий код без фильтрации, а снизу с код фильтрацией*/

class ListItem{
    constructor(text) {
        this.textCont = text;
        this.DoneOrNot = false;
    }
    Done(){
        this.DoneOrNot = !this.DoneOrNot;
    }
}

const items = [];

let all = 0;
let done = 0;
let inProgres = 0;


function Counter(){
    inProgres = 0;
    done = 0;
    let allCount = 0;
    for(let curItem of items){
        if(curItem.DoneOrNot)
            done++;
        else inProgres++;
        allCount++;
    }

    const AllBut = document.getElementById('allListElem');
    const DoneBut = document.getElementById("doneListElem");
    const inProgress = document.getElementById("inProgressListElem");
    AllBut.textContent = 'All-' + allCount.toString();
    DoneBut.textContent = 'Done-' + done.toString();
    inProgress.textContent = 'In Progress-' + inProgres.toString();

}


function ShowAll(){
    RenderTasks('AllItems')
}

function ShowDone(){
    RenderTasks('completed')
}


function InProgress(){
    RenderTasks('inProgress')
}

function butAddOnClick() {
    const text = document.getElementById("textBoxEnter").value;
    items.push(new ListItem(text.toString()));
    RenderTasks('AllItems');
}

function RenderTasks(status){
    all=1;
    const TaskList = document.getElementById('ToDoList');
    while(TaskList.firstChild){
        TaskList.removeChild(TaskList.firstChild);
    }
    if(status === 'AllItems'){
        for(let curItem of items){
            CreateTask(curItem);
        }
    }
    if(status === 'completed'){
        for(let curItem of items){
            if(curItem.DoneOrNot)
                CreateTask(curItem);
        }
    }
    if(status === 'inProgress'){
        for(let curItem of items) {
            if (!curItem.DoneOrNot)
                CreateTask(curItem);
        }
    }
    Counter();
}

function CreateTask(curItem){
    const newElemList  = document.createElement("li");
    const text = document.createElement("span");
    const newID = 'listElem' + all.toString();
    const butDel = document.createElement("button");
    const checkBox = document.createElement("input");
    text.innerText = curItem.textCont;
    text.setAttribute("class", "ListText")
    checkBox.setAttribute("type", "checkbox");
    butDel.textContent = 'X';
    document.getElementById("textBoxEnter").value = '';
    newElemList.setAttribute("id", newID);
    newElemList.appendChild(checkBox);
    newElemList.appendChild(text);
    newElemList.appendChild(butDel);
    newElemList.setAttribute("class", "inProgressElem");
    butDel.setAttribute("class", "ListButtons");
    checkBox.setAttribute("class", "ListCheckBoxes")
    butDel.addEventListener("click", () => {
        all--;
        document.getElementById("ToDoList").removeChild(newElemList);
        items.splice(items.indexOf(curItem), 1);
        Counter();
    })
    if(curItem.DoneOrNot === true) {
        newElemList.setAttribute("class", "finishedElem");
        checkBox.checked = true;
        butDel.style.backgroundColor = 'green';
    }
    checkBox.addEventListener("click", () => {
        curItem.Done();
        if(checkBox.checked === true){
           curItem.DoneOrNot = true;
           butDel.style.backgroundColor = 'green';
           newElemList.setAttribute("class", "finishedElem");
        }
        else {
            curItem.DoneOrNot = false;
            newElemList.setAttribute("class", "inProgressElem");
            butDel.style.backgroundColor = 'darkgray';
        }
        Counter();
    })
    document.getElementById("ToDoList").appendChild(newElemList);
    all++;
}
