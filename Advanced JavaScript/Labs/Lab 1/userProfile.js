console.log("User Profile")
console.log("====================")
var usersProfileManager = {
  users: [],

  addUser: function (name, age, city, street) {
    this.users.push({
      name: name,
      age: age,
      address: {
        city: city,
        street: street,
      },

      getAddress: function () {
        return `${this.address.street} - ${this.address.city}`;
      },
    });
  },

  editUser: function (oldName, newName, age, city, street) {
    this.users.forEach((user) => {
      if (user.name == oldName) {
        user.name = newName;
        user.age = age;
        user.address.city = city;
        user.address.street = street;
        return;
      }
    });
  },

  sort: function () {
    this.users.sort((a, b) => {
      return a.name.localeCompare(b.name) || a.age - b.age;
    });
  },

  getByAge: function (age) {
    found = [];
    this.users.forEach((user) => {
      if (user.age == age) {
        found.push(user);
      }
    });
    return found;
  },

  removeUser: function (name) {
    var index = 0;

    this.users.forEach((user) => {
      if (user.name == name) {
        return;
      }
      index++;
    });

    this.users.splice(index, 1);
  },

  displayAll: function () {
    console.log('All users');
    this.users.forEach((user) => {
      console.log(
        `user name : ${user.name} user age : ${user.age} user address ${user.getAddress()}`,
      );
    });
  },
};

usersProfileManager.addUser('Ahmed', 29, 'street 1', 'city 1');
usersProfileManager.addUser('Ahmed', 27, 'street 0', 'city 0');
usersProfileManager.addUser('Mohamed', 32, 'street 3', 'city 3');
usersProfileManager.addUser('Ali', 30, 'street 2', 'city 2');

console.log("Users Before Sort");
usersProfileManager.displayAll();

usersProfileManager.sort();

console.log("Users After Sort");
usersProfileManager.displayAll();
console.log("=============================");

console.log("Edit User Mohamed");
usersProfileManager.editUser("Mohamed","MohamedEdit",33,"StreetEdit","CityEdit");
usersProfileManager.displayAll();
console.log("=============================");

console.log('users with age 27 :', usersProfileManager.getByAge(27));
console.log("=============================");

console.log("Remove User MohamedEdit");
usersProfileManager.removeUser('MohamedEdit');
usersProfileManager.displayAll();
console.log("=============================");

