FROM node:alpine as development
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["sh", "-c", "sleep 4 && pnpm db:migrate && pnpm start"]

##########################################

# FROM node:alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json .
# COPY pnpm-lock.yaml .

# RUN npm install -g pnpm

# RUN pnpm install --prod

# COPY --from=development /usr/src/app/.next ./.next

# CMD ["pnpm", "start"]
