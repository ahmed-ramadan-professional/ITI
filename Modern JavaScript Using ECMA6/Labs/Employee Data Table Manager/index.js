let start = 0;
let page = 0;
let perPage = Number.parseInt(document.getElementById('perPageSelect').value);
let totalCount = 0;
let search = '';
let sortingState = {
    prevCol: null,
    currentOrder: 'inactive',
};

function appendRow(rowData, index) {
    const defaultRow = document.getElementById('defaultRow');
    const tbody = document.getElementById('tbody');
    let newRow = defaultRow.cloneNode(true);

    newRow.id = `tr${index}`;
    newRow.style.display = '';

    newRow.children[0].innerHTML = index + 1;
    newRow.children[1].innerHTML = rowData.name;
    newRow.children[2].innerHTML = rowData.position;
    newRow.children[3].innerHTML = rowData.office;
    newRow.children[4].innerHTML = rowData.age;
    newRow.children[5].innerHTML = rowData.start_date;
    newRow.children[6].innerHTML = rowData.salary;
    newRow.children[7].children[0].setAttribute(
        'onclick',
        `edit(${index},'${rowData.id}')`,
    );
    newRow.children[8].children[0].setAttribute(
        'onclick',
        `deleteRow('${rowData.id}')`,
    );

    tbody.appendChild(newRow);
}

function sortTable(index) {
    let th = document.getElementById(`th${index}`);
    let prevTh =
        sortingState.prevCol &&
        document.getElementById(`th${sortingState.prevCol}`);
    if (index == sortingState.prevCol) {
        sortingState.currentOrder =
            sortingState.currentOrder == 'inactive'
                ? 'asc'
                : sortingState.currentOrder == 'asc'
                  ? 'desc'
                  : 'inactive';
        th.className = '';
        th.classList.add(sortingState.currentOrder);
    } else {
        sortingState.currentOrder = 'asc';
        th.className = '';
        th.classList.add(sortingState.currentOrder);
        if (prevTh) {
            prevTh.className = '';
            prevTh.classList.add('inactive');
        }
    }
    sortingState.prevCol = index;
    fetchData();
}

function edit(index, id) {
    const defaultEditRow = document.getElementById('defaultEditRow');
    const rowToEdit = document.getElementById(`tr${index}`);
    const tbody = document.getElementById('tbody');
    let inputRow = defaultEditRow.cloneNode(true);

    inputRow.id = '';
    inputRow.style.display = '';

    inputRow.children[0].innerHTML = index + 1;

    inputRow.children[1].firstElementChild.value =
        rowToEdit.children[1].innerHTML;
    inputRow.children[2].firstElementChild.value =
        rowToEdit.children[2].innerHTML;
    inputRow.children[3].firstElementChild.value =
        rowToEdit.children[3].innerHTML;
    inputRow.children[4].firstElementChild.value =
        rowToEdit.children[4].innerHTML;
    inputRow.children[5].firstElementChild.value =
        rowToEdit.children[5].innerHTML;
    inputRow.children[6].firstElementChild.value =
        rowToEdit.children[6].innerHTML;

    inputRow.children[7].addEventListener('click', (e) => {
        for (let i = 1; i < 7; i++) {
            let element =
                e.target.parentElement.parentElement.children[i]
                    .firstElementChild;
            if (!element.value.trim()) {
                element.setAttribute('placeHolder', 'required!');
                element.classList.add('required');
                return;
            }
        }
        saveEdit(e.target.parentElement.parentElement, id);
        tbody.insertBefore(rowToEdit, inputRow);
        e.target.parentElement.parentElement.remove();
    });

    inputRow.children[8].addEventListener('click', (e) => {
        tbody.insertBefore(rowToEdit, inputRow);
        e.target.parentElement.parentElement.remove();
    });

    tbody.insertBefore(inputRow, rowToEdit);
    rowToEdit.remove();
}

function saveEdit(row, id) {
    let data = {
        id: id,
        name: row.children[1].firstElementChild.value,
        position: row.children[2].firstElementChild.value,
        office: row.children[3].firstElementChild.value,
        age: row.children[4].firstElementChild.value,
        start_date: row.children[5].firstElementChild.value,
        salary: row.children[6].firstElementChild.value,
    };

    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function add() {
    const defaultAddRow = document.getElementById('defaultEditRow');
    const tbody = document.getElementById('tbody');
    const addBtn = document.getElementById('add');
    let addRow = defaultAddRow.cloneNode(true);

    addRow.style.display = '';
    addBtn.style.display = 'none';

    addRow.children[0].innerHTML = perPage + 1;
    addRow.children[7].firstElementChild.innerHTML = 'Add';

    addRow.children[7].addEventListener('click', (e) => {
        for (let i = 1; i < 7; i++) {
            let element =
                e.target.parentElement.parentElement.children[i]
                    .firstElementChild;
            if (!element.value.trim()) {
                element.setAttribute('placeHolder', 'required!');
                element.classList.add('required');
                return;
            }
        }
        saveAdd(e.target.parentElement.parentElement);

        e.target.parentElement.parentElement.remove();
        addBtn.style.display = '';
    });

    addRow.children[8].addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
        addBtn.style.display = '';
    });

    tbody.appendChild(addRow);
}

function saveAdd(row) {
    let data = {
        name: row.children[1].firstElementChild.value,
        position: row.children[2].firstElementChild.value,
        office: row.children[3].firstElementChild.value,
        age: row.children[4].firstElementChild.value,
        start_date: row.children[5].firstElementChild.value,
        salary: row.children[6].firstElementChild.value,
    };

    fetch(`http://localhost:3000/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function deleteRow(id) {
    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function updatePagination() {
    let defaultPage = document.getElementById('defaultPage');
    let pagination = document.getElementById('pagination');

    pagination.innerHTML = '';

    if (totalCount == 0) {
        document.getElementById('info').innerHTML = '';
        return;
    }

    for (let i = 0; i < totalCount / perPage; i++) {
        let newPage = defaultPage.cloneNode(true);
        newPage.style.display = '';
        newPage.firstElementChild.innerHTML = i + 1;
        if (i == page) newPage.firstElementChild.classList.add('active');
        newPage.addEventListener('click', (e) => {
            page = Number.parseInt(e.target.innerHTML) - 1;
            start = Number.parseInt(page) * Number.parseInt(perPage);
            fetchData();
        });
        pagination.appendChild(newPage);
        document.getElementById('info').innerHTML =
            `Showing ${start + 1} to ${Math.min(start + perPage, totalCount)} of ${totalCount}`;
    }
}

function fetchData() {
    document.getElementById('tbody').innerHTML = '';
    let sortingQuery = '';
    if (sortingState.prevCol && sortingState.currentOrder != 'inactive') {
        sortingQuery = `&_sort=${
            document.getElementById(`th${sortingState.prevCol}`).dataset
                .sortName
        }&_order=${sortingState.currentOrder}`;
    }
    fetch(
        `http://localhost:3000/employees?_start=${start}&_limit=${perPage}${sortingQuery}&q=${search}`,
    )
        .then((res) => {
            totalCount = res.headers.get('X-Total-Count');
            return res.json();
        })
        .then((res) => {
            res.forEach((employee, index) => {
                appendRow(employee, index);
            });
            updatePagination();
        })
        .catch((error) => {
            console.error(error);
        });
}

document.getElementById('perPageSelect').addEventListener('change', (e) => {
    perPage = Number.parseInt(e.target.value);
    page = 0;
    start = 0;
    fetchData();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    search = e.target.value;
    fetchData();
});

fetchData();
