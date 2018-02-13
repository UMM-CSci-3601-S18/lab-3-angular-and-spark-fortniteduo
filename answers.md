Q1: The .gitignore file in the lab-3-angular.. package contains less lines than the single lab 2 .gitignore file.
The lab-3-server .gitignore file is only two lines.
Theres another .gitignore file in the client folder.
We might have more than one .gitignore file so the client, server, and overall lab package can work together to be interconnected.

Q2: The build.gradle file in the overall lab package connects each other build.gradle files from the server and client that allows for seperate builds, instead of one very big build.

Q3: No the SparkJava server isn't the only thing doing routing.
There is a file in the client called app.routes.ts which also does routing.

Q4: user-list.service.ts allows us to get a single user by ID or all the users from the client. 
It's not done in the user-list.component.ts because the component file is mainly for visuals and things that shouldn't be interacted with, while getting users is something that must be interacted with to be performed.
