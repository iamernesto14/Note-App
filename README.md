
# NoteApp README

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Services](#services)
- [Components](#components)
- [Styles](#styles)
- [Testing](#testing)

## Introduction

### Brief Description

NoteApp is a simple note-taking application built with Angular, allowing users to create, read, update, and delete notes, as well as search and filter them.

### About the Project

NoteApp is an Angular application designed for note-taking and organization. The app allows users to create, read, update, and delete notes, as well as search and filter them.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository using `git clone`.
2. Install the dependencies using `npm install`.
3. Start the development server using `ng serve`.
4. Open your browser and navigate to `http://localhost:4200/`.

## Project Structure

The project is organized into the following folders:

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── sidebar/
│   │   ├── note-list/
│   │   ├── note-create/
│   │   ├── note-dashboard/
│   │   ├── login/
│   │   ├── forget-password/
│   │   ├── profile-settings/
│   │   ├── archived-notes/
│   │   └── deleted-notes/
│   ├── services/
│   │   ├── auth-service.ts
│   │   ├── note.service.ts
│   │   └── toaster.service.ts
│   ├── models/
│   │   └── note.interface.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
│   ├── images/
│   └── icons/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── styles/
│   └── styles.scss
├── app.scss
├── index.html
├── main.ts
├── polyfills.ts
├── test.ts
e2e/
├── src/
│   ├── app.e2e-spec.ts
│   └── app.po.ts
node_modules/
angular.json
package.json
README.md
tsconfig.json
tsconfig.app.json
tsconfig.spec.json
```

## Features

- User authentication (signup and login)
- Note creation, editing, and deletion
- Note searching and filtering
- Simple writing environment

## Services

- `AuthService`: Handles user authentication and storage.
- `NoteService`: Manages note creation, editing, and deletion.
- `ToasterService`: Displays toast notifications.

## Components

- `HeaderComponent`: Displays the application header.
- `SidebarComponent`: Displays the application sidebar.
- `NoteListComponent`: Displays a list of notes.
- `NoteCreateComponent`: Allows users to create new notes.
- `NoteDashboardComponent`: Displays a dashboard for notes.
- `LoginComponent`: Handles user login.
- `ForgetPasswordComponent`: Handles password reset.
- `ProfileSettingsComponent`: Handles user profile settings.
- `ArchivedNotesComponent`: Displays archived notes.
- `DeletedNotesComponent`: Displays deleted notes.


## Styles

The application uses SCSS for styling. Global styles are defined in `src/styles.scss`.

## Testing

The application uses Karma for unit testing. Test files are located in `src/app/components/`.
