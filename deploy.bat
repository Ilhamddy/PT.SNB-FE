cd %~dp0
git checkout develop-deploy
git merge develop
git pull
git push
git checkout 