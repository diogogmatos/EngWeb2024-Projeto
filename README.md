![UniShareBanner](/assets/banner.png)

# 🎓 UniShare

**UniShare** is a web platform developed as part of the Web Engineering course for the academic year 2023/2024. Its main goal is to serve as a hub of study support materials for the entire academic community, regardless of course or subject.

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.md) [![pt-pt](https://img.shields.io/badge/lang-pt--pt-green.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.pt-pt.md)

## 🏆 Results

> 🏅 **20/20**

## 📒 Features

### Dashboard

![Dashboard](/assets/full_page.png)

The central focus of the platform is the dashboard, where users can search, filter, and add resources, as well as easily navigate to any other page or dialog in the system. All the most important information is contained on the dashboard's main page.

### Navbar

![Navbar](/assets/navbar.png)

The navbar allows users to navigate between different views on the main dashboard page.

The **Popular** page displays resources sorted by descending popularity, meaning the resources with the most interactions are shown higher up the list. This popularity metric is calculated using an algorithm where each type of interaction has a different weight on the resource's popularity.

The **Newest** page shows the most recently added resources to the platform, allowing users to quickly see the latest additions by other users.

Additionally, the navbar allows users to access their profile page by clicking their name in the upper left corner. We explore this page further below.

### Favorites

![Favorites](/assets/favorites.png)

The favorites page allows authenticated users to view the resources they have favorited over time.

### Search Bar

![SearhBar](/assets/searchbar.png)

The search bar allows users to search the large set of visible resources on the screen using keywords. Users can search by any word in any main field of a resource, including its title, description, hashtags, course, subject, type, creation date, user, and even document format (PDF, ZIP, etc.).

### Filters

| Default                          | Search by Course                         | Search by Subject                        |
| ------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ![Filters](/assets/filters.png) | ![FiltersCurso](/assets/filter_search.png) | ![FiltersUC](/assets/subjects_filter.png) |

Filters allow easy and quick filtering of presented resources by type, course, or subject. Users can easily search for the course or subject in the selection menu for each.

### Add Resource

![AddResource](/assets/resource_dialog.png)

The **Add Resource** button takes authenticated users to a dialog where they can easily submit their resource and fill in the necessary information. Here too, the course and subject selection fields allow for searching options.

An **admin** user can add new resource types, courses, or subjects in this dialog.

### Resource Card

![ResourceCard](/assets/card.png)

A resource card acts as a gateway to a set of user interactions. It compactly presents all essential information about the resource and the community's interaction with it. It also allows users to easily interact with the resource and access its settings.

A resource contains a set of essential attributes:

- Type (Report, Note, Test, Exam, etc.) (Expandable)
- Title
- Description (Optional)
- Hashtags (Optional)
- Subject
- Course

There are a variety of possible interactions with a resource:

- Upvote
- Downvote
- Comment
- Download
- Favorite

| Standard User               | Admin                                      |
| --------------------------- | ------------------------------------------ |
| ![Actions](/assets/actions.png) | ![AdminActions](/assets/actions_admin.png) |

If the user owns the resource, they have access to a set of options: **Edit**, **Archive**, or **Delete**. If they are a system admin, they also have the option to **Lock** the resource, preventing its visibility from being changed.

![Hover](/assets/hover.png)

Finally, users can easily see details about the resource publisher by hovering over their name.

### Comments

![Comment](/assets/comment.png)

Clicking on a resource's comment icon takes users to a dialog where they can join a discussion about the resource in the comments or simply leave a thank you message.

### Resource Page

![ResourcePage](/assets/resourcepage.png)

The resource page allows users an expanded view of the resource's information, with access to the full list of comments and even a preview of the file's content for compatible formats (PDF, PNG, JPEG, or JPG).

### Edit Resources

![Edit](/assets/edit_resource.png)

Clicking the edit icon in a resource's submenu takes users to a dialog where they can easily edit the main information of their published resource through a familiar interface, though it is not possible to edit the published file, only the associated meta information.

### Profile Page

![Profile](/assets/profile.png)

Users can access their profile page or any other user's profile by clicking their name anywhere in the interface. This page shows the resources the user has published, their favorites, the comments they have made, and the resources they have upvoted.

![ProfileComments](/assets/profile_comments.png)

If the user is viewing their own profile, they also have the option to edit the profile or access account settings.

| Edit Profile                            | Account Settings                           |
| --------------------------------------- | ------------------------------------------ |
| ![EditProfile](/assets/edit_profile.png) | ![AccountSettings](/assets/account_settings.png) |

### Pagination

To handle a potentially high number of resources, all resource-listing pages implement pagination at the API level, where only the resources on the current page are displayed. This solution helps maintain platform efficiency in contexts with large database entries.

![Pagination](/assets/pagination.png)

The page size is defined by a number of resources and can be configured by the user in [lib/config.ts](/lib/config.ts).

### Sign In / Sign Up

| Sign in                       | Sign up                       |
| ----------------------------- | ----------------------------- |
| ![Signin](/assets/signin.png) | ![Signup](/assets/signup.png) |

Users can sign up using an email and password or an external service like GitHub.

Passwords are securely stored using hashing with the help of the npm package bcrypt.

### Appearance

| Light Mode                          | Dark Mode                         |
| ----------------------------------- | --------------------------------- |
| ![LightMode](/assets/full_page.png) | ![DarkMode](/assets/darkmode.png) |

The platform also offers a choice between a light or dark appearance mode that extends throughout the system.

## 🔒 Access Levels

The application has 3 different access levels: **Administrator**, **Producer**, and **Consumer**, with the latter two depending on each individual resource. A user/admin can be a consumer of one resource and a producer of another.

An admin user has the following additional permissions:

- Edit resource
- Delete resource
- Archive/Unarchive resource (change resource visibility)
- Lock/Unlock resource (prevent visibility changes by the producer)
- Add resource type
- Add course
- Add subject

It is the responsibility of the database manager to grant or remove admin permissions from an existing user.

A producer user has access to the following operations on their resources:

- Edit
- Archive/Unarchive
- Delete

Additionally, our application allows for a **guest** user. That is, unauthenticated users have access to the platform with limited functionality.

A guest user is only a consumer of all resources, being able to download them and view all their details. They can also view other users' profiles and their interactions. However, a guest user **does not** have access to the following features:

- Interact with a resource:
  - Upvote
  - Downvote
  - Comment
  - Favorite
- Access the favorites page
- Submit new resources

Users are encouraged to authenticate themselves when attempting to access exclusive features.

![NoPermission](/assets/nopermission.png)

All these access levels extend to the developed API, which includes session checks to ensure user authentication and the protection of sensitive endpoints.

## 🔗 REST API

The developed API has the following endpoints, properly protected with session token authentication where applicable.

**Resources**

- **POST /api/resources** - Submit resource
- **GET /api/resources/all/[page]** - List all resources
- **GET /api/resources/popular/[page]** - List visible resources (by popularity)
- **GET /api/resources/newest/[page]** - List visible resources (by newest)
- **GET /api/resources/count** - Get total number of resources
- **GET /api/resources/[rid]** - Get resource
- **PUT /api/resources/[rid]** - Edit resource
- **DELETE /api/resources/[rid]** - Delete resource
- **GET /api/resources/[rid]/comments** - List resource comments
- **GET /api/resources/[rid]/download** - Download resource content
- **POST /api/resources/[rid]/hide** - Archive resource
- **POST /api/resources/[rid]/show** - Unarchive resource
- **POST /api/resources/[rid]/lock** - Lock resource
- **POST /api/resources/[rid]/unlock** - Unlock resource
- **GET /api/resources/from/[uemail]/[page]** - List user's resources
- **GET /api/resources/from/[uemail]/count** - Get total number of user's resources
- **GET /api/resources/ids/[page]** - List requested resources
- **GET /api/resources/ids/[page]/count** - Get total number of requested resources

`page`: Page to retrieve
`rid`: Resource ID
`uemail`: User email

---

**Users**

- **GET /api/users/[uemail]** - Get user data
- **PUT /api/users/[uemail]** - Edit user data
- **POST /api/users/[uemail]/upvote** - Upvote a resource
- **DELETE /api/users/[uemail]/upvote** - Remove upvote from a resource
- **POST /api/users/[uemail]/downvote** - Downvote a resource
- **DELETE /api/users/[uemail]/downvote** - Remove downvote from a resource
- **POST /api/users/[uemail]/favorite** - Favorite a resource
- **DELETE /api/users/[uemail]/favorite** - Remove resource from favorites
- **POST /api/users/[uemail]/comment** - Comment on a resource
- **DELETE /api/users/[uemail]/comment** - Delete resource comment
- **GET /api/users/[uemail]/comments** - List user comments
- **GET /api/users/[uemail]/favorites/[page]** - List user favorites
- **GET /api/users/[uemail]/favorites/count** - Get total number of user favorites
- **GET /api/users/[uemail]/votes/[page]** - List user votes
- **GET /api/users/[uemail]/votes/count** - Get total number of user votes

`page`: Page to retrieve
`uemail`: User email

---

**Courses**

- **POST /api/courses** - Add course
- **GET /api/courses** - List all courses

---

**Subjects**

- **POST /api/subjects** - Add subject
- **GET /api/subjects** - List all subjects

---

**Resource Types**

- **GET /api/documentType** - List resource types
- **POST /api/documentType** - Add resource type

---

**Authentication**

- **/api/auth/...**

Managed by the **NextAuth.js** library.

## 📦 Export / Import

Two bash scripts have been developed to export or import the current state of the entire system at any time, from the database content to the files stored locally on the server. The exported content is saved in a _snapshot_ folder that includes the date of the export in its name. To import a state, simply provide the path to the folder containing the desired _snapshot_ as an argument.

The scripts should be executed from the root of the project as follows:

**Export**

```bash
./scripts/export.sh app
```

**Import**

```bash
./scripts/import.sh <path-to-snapshot>
```

This functionality is essential for, for example, performing regular backups of critical information, which is fundamental in a real-world context.

## 🛠️ Technologies & Tools Used

The project was developed monolithically using the **Next.js** framework with **TypeScript** and **TailwindCSS**, which includes both the web page implementation and the implementation of a REST API, responsible for communicating with the database and performing various operations. Additionally, we used the **shadcn/ui** component library to assist in faster and more perfectionist development of the various components of the platform.

**MongoDB** was used as the database to store all information related to resources, users, interactions, sessions, courses, curricular units, and document types. User-submitted files are stored locally on the server and are public. In a real-world context, this option would be replaced by storing the files in a dedicated cloud service like AWS or another, and transitioning to this model from the current implementation would be easy.

The **NextAuth.js** library was used to manage all system authentication.

## 📥 Prerequisites

Running the application requires the following software:

- [Node.js 20.11.1+](https://nodejs.org/en/download/)
- mongosh
- mongodb-tools
- docker
- docker-compose

## 🔧 Setup

Install all dependencies.

```bash
npm install
```

You need to configure a `.env.local` file with environment variables required for the application to function, including secrets. In the root of the project, the `.env.local.sample` file provides a template with the necessary variables:

```
NEXTAUTH_SECRET = <your-generated-secret>
GITHUB_APP_CLIENT_ID = <your-github-app-client-id>
GITHUB_APP_CLIENT_SECRET = <your-github-app-client-secret>
MONGO_URI = <your-mongodb-connection-uri>
NEXTAUTH_URL = <your-website-url>
```

## 🔨 Development

Run the project in a containerized environment.

```
docker compose up
```

> [!NOTE]  
> Use the `--build` flag on the first run.

Format the code.

```bash
npm run format
```

## 🔗 References

- [Getting Started with React](https://reactjs.org/docs/getting-started.html)
- [Learn Next.js](https://nextjs.org/learn)
- [Getting Started with NextAuth.js](https://next-auth.js.org/getting-started/example)
- [Get Started with Docker](https://www.docker.com/get-started/)
- [shadcn/ui](https://ui.shadcn.com/docs)

## 👥 Team

- Carlos Ribeiro, A100761
- Diogo Matos, A100741
- Júlio Pinto, A100742
