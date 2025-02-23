function logPerson(person) {
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(person.type === 'admin' ? person.role : person.occupation));
}
function filterPersons(persons, personType, criteria) {
    return persons
        .filter(function (person) { return person.type === personType; })
        .filter(function (person) {
        var criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every(function (fieldName) {
            return person[fieldName] === criteria[fieldName];
        });
    });
}
var persons = [
    { type: 'user', name: 'John Doe', age: 30, occupation: 'Software Developer' },
    { type: 'admin', name: 'Alice Smith', age: 45, role: 'Project Manager' },
    { type: 'user', name: 'Emily Davis', age: 22, occupation: 'Graphic Designer' },
    { type: 'admin', name: 'Michael Johnson', age: 50, role: 'CTO' },
    { type: 'user', name: 'David Brown', age: 27, occupation: 'Data Analyst' },
    { type: 'admin', name: 'Sarah Wilson', age: 35, role: 'HR Manager' }
];
var usersOfAge22 = filterPersons(persons, 'user', { age: 22 });
var adminsOfAge45 = filterPersons(persons, 'admin', { age: 45 });
var developers = filterPersons(persons, 'user', { occupation: 'Software Developer' });
var hrManagers = filterPersons(persons, 'admin', { role: 'HR Manager' });
console.log('Users of age 22:');
usersOfAge22.forEach(logPerson);
console.log();
console.log('Admins of age 45:');
adminsOfAge45.forEach(logPerson);
console.log();
console.log('Software Developers:');
developers.forEach(logPerson);
console.log();
console.log('HR Managers:');
hrManagers.forEach(logPerson);
