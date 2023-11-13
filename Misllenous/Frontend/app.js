class Student {
    constructor(name,age,marks){
        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    talk () {
        console.log(`Hello My Name Is ${this.name}`);
    }
}

let student1 = new Student ("Ahona", 23, 99);