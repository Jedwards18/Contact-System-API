# Contact-System-API

# Introduction

This project is an API for managing a Contact List System. It is a Node.js program which utilizes TypeScript. I used TypeScript to ensure proper formatting of incoming and outgoing data rather than traditional schemas, because I feel that it gives me more control over the data as a developer, and improves readibility of the code. The database is lokijs and I have created additional Ids for each entry (using uuidv4) rather than rely on the built-in lokijs ids. The lokijs simply incrementing numbers, which is not something I would ever use as unique identifier in a real-world database. I chose lokijs because I really liked the documentation that it provided and it had some functionality for creating, querying and seeding collections. It also seemed like it would be easier to query nested objects, which was crucial for this program. In retrospect, I could have flattened the Contact objects into separate collections, with foreign keys, which might have made some of the functionality a little easier. But I'm not sure if lokijs supports that, and it seemed to me that keeping a structure similar to Mongo collections was important for this project.

On start, the db will be seeded with existing contacts, which are read in from the exampleContacts.ts file in the models folder. There is also a line in the db file to clear the collection, which will trigger the seeding function again. The entirety of the program logic for individual endpoints (routes) is in applicationRouter.ts.

# Getting Started

No additional setup, aside from running "npm install" is required.

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

Running "npm run dev" in the terminal will execute the program.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
