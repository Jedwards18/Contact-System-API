export enum Events {
    InitializingDatabase = 'InitializingDatabase',
    SeedingCollection = 'SeedingCollection',
    GetContacts = 'GetContacts',
    GetSpecificContact = 'GetSpecificContact',
    GetCallList = 'GetCallList',
    DeleteContact = 'DeleteContact',
    CreateNewContact = 'CreateNewContact',
    UpdateContact = 'UpdateContact',
    InputError = 'InputError',
    SigTerm = 'SigTerm',
    Other = 'Other',
}

export enum LogLevels {
    Fatal = 'fatal',
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
    Trace = 'trace',
}