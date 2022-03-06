# Introduction

This project is an API for managing a Contact List System. It is a Node.js program which utilizes TypeScript. 
I used TypeScript to ensure proper formatting of incoming and outgoing data rather than traditional schemas, 
because I feel that it gives me more control over the data as a developer, and improves readibility of the code. 
The database is lokijs and I have created additional Ids for each entry (using uuidv4) rather than rely on the built-in lokijs ids. 
The lokijs simply incrementing numbers, which is not something I would ever use as unique identifier in a real-world database.

I chose lokijs as the in-memory db for this project because the it seemed very simple to setup, but also had some more complex configurations
that provided some flexibility with the initialization and maintenance, and also simple to query. The documentation was well done, and the sandbox
environment provided was very helpful. I appreciate good documentation, and while this is not always true, I have often found there is a correlation of good
code/services and good documentation. For the most part, I feel this is true of lokijs, aside from its "unique identifiers" that is. The one issue I did have
is the documentation/examples is not very explicit regarding updating existing entries in a collection.

My logging method may be a bit overkill for a project of this size, but I have found that using pino, and setting up the logging the way I did, really
helps with debugging. Logging the event and the level (info, error, etc.) is a great way to track the services that are triggered and follow the flow of
the program from the terminal. This logging method also scales very well, which is always a boon.

On start, the db will be seeded with existing contacts, which are read in from the exampleContacts.ts file in the models folder. 
There is also a line in the db file to clear the collection, which will trigger the seeding function again. 
The entirety of the program logic for individual endpoints (routes) is in applicationRouter.ts.

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
