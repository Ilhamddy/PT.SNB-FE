cd %~dp0
git checkout develop
git checkout develop-deploy || {
    echo Kesalahan checkout
    exit /b 1
}
git merge develop || {
    echo Kesalahan merge
    git checkout develop
    exit /b 1
}
git pull && {
    git commit -am "Merge branch remote to local"
    git push && {
        echo Kesalahan push 1
        git checkout develop
        exit /b 1
    }
} || {
    git push && {
        git pull && {
            echo Kesalahan pull
            git checkout develop
            exit /b 1
        }
    } || {
        echo Kesalahan push
        git checkout develop
        exit /b 1
    }

}

git checkout develop || {
    echo Kesalahan checkout
    exit /b 1
}