interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

type Criteria<T> = Omit<Partial<T>, 'type'>;

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

function filterPersons(persons: Person[], personType: 'user', criteria: Criteria<User>): User[];
function filterPersons(persons: Person[], personType: 'admin', criteria: Criteria<Admin>): Admin[];
function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): Person[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            const criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

const persons: Person[] = [
    { type: 'user', name: 'John Doe', age: 30, occupation: 'Software Developer' },
    { type: 'admin', name: 'Alice Smith', age: 45, role: 'Project Manager' },
    { type: 'user', name: 'Emily Davis', age: 22, occupation: 'Graphic Designer' },
    { type: 'admin', name: 'Michael Johnson', age: 50, role: 'CTO' },
    { type: 'user', name: 'David Brown', age: 27, occupation: 'Data Analyst' },
    { type: 'admin', name: 'Sarah Wilson', age: 35, role: 'HR Manager' }
];

const usersOfAge22 = filterPersons(persons, 'user', { age: 22 });
const adminsOfAge45 = filterPersons(persons, 'admin', { age: 45 });
const developers = filterPersons(persons, 'user', { occupation: 'Software Developer' });
const hrManagers = filterPersons(persons, 'admin', { role: 'HR Manager' });

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