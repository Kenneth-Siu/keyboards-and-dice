export class User {
    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    static createFromDb(dbUser) {
        return new User(dbUser.id, dbUser.display_name);
    }

    static createManyFromDb(dbUsers) {
        return dbUsers.map(dbUser => User.createFromDb(dbUser));
    }
}
