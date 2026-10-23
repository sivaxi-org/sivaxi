
#!/usr/bin/env bash

docker compose up -d

npx ng serve shell --port 4200  &
npx ng serve vixi --port 4201  &
npx ng serve portfolio --port 4202 &
npx ng serve auth --port 4203  &

wait
