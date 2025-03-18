# corkboard

corkboard is a lightweight, ephemeral message board where users can post content anonymously or with a username. all posts automatically disappear after 24 hours, ensuring a fresh and temporary discussion space.

## features
- **anonymous or named posting**: users can choose to post with a username or remain anonymous.
- **24-hour post expiry**: all posts are automatically deleted after 24 hours.
- **media support**: optionally attach images to posts. [WIP]
- **commenting**: leave comments under any post. [WIP]
- **voting**: vote on your favourite (or least favourite) posts. [WIP]
- **simple & fast**: minimalistic design for easy interaction.

## tech stack
### backend
- **spring boot**
- **postgresql**
- hosted with **heroku**

### frontend
- **react (tsx)**
- **tailwind css**
- hosted with **vercel**

## setup
### prerequisites
ensure you have the following installed:
- java 17+
- node.js 18+
- postgresql
- docker (optional, for database setup)

### backend
1. clone the repository and initialize submodules:
   ```sh
   git clone --recurse-submodules https://github.com/gooosexe/corkboard.git
   cd corkboard/backend
   ```
2. configure your postgresql database in `application.properties`.
3. build and run the backend:
   ```sh
   ./gradlew bootrun
   ```

### frontend
1. navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. install dependencies:
   ```sh
   npm install
   ```
3. start the development server:
   ```sh
   npm run dev
   ```

## contributing
pull requests and issues are welcome! please follow the existing coding style and submit changes via feature branches.
