////////////////////Variables//////////////////////////////////////
const $=document
const addBtn=_id('add-book')
const bookList=_id('book_list')
const titleInput=_id('title')
const authorInput=_id('Author')
const yearInput=_id('Year')
const bookInputs=_qAll('.book')
let isValid=[];
let titleValue;
let authorValue;
let yearValue;
let validation;
let bookListArray=[];
let count=0;
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
///////////////////////////////////////////////// fire on btn
function addNewBook() {
    titleValue=titleInput.value
    authorValue=authorInput.value
    yearValue=yearInput.value
    checkValidation()
    if (validation){
        generateNewBookElement(titleValue,authorValue,yearValue)
    }else{
        bookInputs.forEach(function (input) {
            if(input.value.length<1){
                input.parentElement.classList.add('active')
            }else{
                input.parentElement.classList.remove('active')
            }
        })
    }
    isValid=[]


}
function generateNewBookElement(title,author,year) {
    bookInputs.forEach(function (input) {
        input.parentElement.classList.remove('active')
    })
    let newBookTr=$.createElement('tr')
    newBookTr.setAttribute('data-val',count)
    let titleTd=$.createElement('td')
    let authorTd=$.createElement('td')
    let yearTd=$.createElement('td')
    let removeIcon=$.createElement('i')
    bookListArray.push({
        id:count,
        title:title,
        author:author,
        year:year
    })
    localStorage.setItem('bookList',JSON.stringify(bookListArray))
    removeIcon.className='bi bi-x-lg float-end'
    removeIcon.setAttribute('onclick','removeBookHandler(event)')
    titleTd.innerHTML=title
    authorTd.innerHTML=author
    yearTd.innerHTML=year
    yearTd.append(removeIcon)
    newBookTr.append(titleTd,authorTd,yearTd)
    bookList.append(newBookTr)
    console.log(bookListArray)
    yearInput.value=''
    titleInput.value=''
    authorInput.value=''
    count++

}
function checkValidation() {
    bookInputs.forEach(function (input) {
        if(input.value.length<1){
            isValid.push(false)
        }else{
            isValid.push(true)
        }
    })
    return  validation=isValid.every(function (item) {
        return item===true
    })
}
function reloadData() {
    titleInput.focus()
    yearInput.value=''
    titleInput.value=''
    authorInput.value=''
    let lastBookList=JSON.parse(localStorage.getItem('bookList'))
    if(lastBookList!==null){
        lastBookList.forEach(function (item) {
            generateNewBookElement(item.title,item.author,item.year)
        })
    }

}
function removeBookHandler(event) {
    event.target.parentElement.parentElement.remove()
    let dataVal=event.target.parentElement.parentElement.dataset.val
    console.log(typeof dataVal)
    let bookList=JSON.parse(localStorage.getItem('bookList'))
    bookList.forEach(function (item) {
        console.log(typeof  item.id)
        if(item.id===Number(dataVal)){
            bookList.splice(dataVal,1)
        }
    })
    localStorage.setItem('bookList',JSON.stringify(bookList))

}
window.addEventListener('load',reloadData)
bookInputs.forEach(function (input) {

    input.addEventListener('keyup',function (e) {
        if(e.key==='Enter'){
            addNewBook()
        }
    })
    titleInput.focus()
})
addBtn.addEventListener('click',addNewBook)