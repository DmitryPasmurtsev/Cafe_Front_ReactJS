export const getEmployeesSel = (state) => {
    return state.employeesPage.employeesObjects
}

export const getEmployeeSel = (state) => {
    return state.employeeInfoPage.employee;
}

export const getPositionsSel = (state) => {
    return state.employeesPage.positions;
}