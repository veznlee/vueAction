# git 常用命令合集


>> 说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。
^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。

## 远程仓库与本地代码的初次合并流程

从 GitHub 把中央仓库 clone 到本地（使用命令： `git clone`）
把写完的代码提交（先用 `git add 文件名` 把文件添加到暂存区，再用 `git commit -m '提交说明'` 提交）
在这个过程中，可以使用 `git status` 来随时查看工作目录的状态
每个文件有 "changed / unstaged"（已修改）, "staged"（已修改并暂存）, "commited"（已提交） 三种状态，以及一种特殊状态 "untracked"（未跟踪）
提交一次或多次之后，把本地提交推送到中央仓库（`git push`）


## 常用命令

```
git add .//添加所有更改到暂存区
git commit -m ''//提交暂存区的修改
git pull//从远处仓库拉取最新资源
git merge branch//合并分支
git push origin branch//推送资源到远程分支

merge——合并 commits
git checkout master
git merge branch1

rebase——在新位置重新提交
git checkout branch1
git rebase master
git checkout master
git merge branch1

reset——丢弃最新的提交
git reset --hard HEAD^

reflog——查看引用的 log
git reflog 默认查看 HEAD 的移动历史
git reflog master

git push origin branch1 -f  //线上有的分支，本地删除了，强制提交
git stash //打包
git stash pop //回到打包前的状态


reset --hard：重置工作目录
你的工作目录里的内容会被完全重置为和 HEAD 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。
reset --soft：保留工作目录
保留工作目录和暂存区中的内容，并把重置 HEAD 所带来的新的差异放进暂存区。
reset 不加参数（默认--mixed）：保留工作目录，并清空暂存区
```


## 分支管理

```
git branch branch
git checkout branch
git checkout -b branch
git branch -d feature1

git checkout feature1
git push origin feature1

git branch -d books
git push origin -d books
```


## 错误提交解决方案

1、修改你的错误提交，并新增commit

2、`git commit --amend` 修复最新 commit 的错误

3、`git rebase -i HEAD^^`
>> 交互式 rebase 最常用的场景是修改写错的 commit，但也可以用作其他用途。
>> 使用方式:
>> `git rebase -i 目标commit`；
>> 在编辑界面中指定需要操作的 commits 以及操作类型；
>> 操作完成之后用 `git rebase --continue` 来继续 rebase 过程。

4、`git rebase -i HEAD^^` 撤销提交

5、`git revert HEAD^`


## 将本地的项目放到远程已有的仓库

1、在本地创建一个版本库（即文件夹），通过 `git init` 把它变成Git仓库；

2、把项目复制到这个文件夹里面，再通过 `git add .` 把项目添加到仓库；

>> (1)和(2)也可以直接在已有内容的文件夹里直接执行git init

3、再通过 `git commit -m "注释内容"` 把项目提交到仓库；

4、在Github上设置好SSH密钥后，新建一个远程仓库，通过 `git remote add origin https://github.com/xxx/xxx.git` 将本地仓库和远程仓库进行关联；

5、最后通过 `git push -u origin master` 把本地仓库的项目推送到远程仓库（也就是Github）上；

>> 注：若新建远程仓库的时候自动创建了README文件会报错，解决办法
    先：`git pull --rebase origin master`</br>
    再：`git push -u origin master`


## 其他

1、查看历史中的多个 commit：`git log`；

2、查看详细改动： `git log -p`；查看大致改动： `git log --stat`；

3、查看具体某个 commit：`git show`；

4、要看最新 commit ，直接输入 `git show`；

5、要看指定 commit ，输入 `git show commit的引用或SHA-1`，如果还要指定文件，在 `git show` 的最后加上文件名；

6、查看未提交的内容：`git diff`；

7、查看暂存区和上一条 commit 的区别：`git diff --staged`（或 --cached）；

8、查看工作目录和暂存区的区别：`git diff 不加选项参数`；

9、查看工作目录和上一条 commit 的区别：`git diff HEAD`；

10、退出日志查看: `q`；

11、`git checkout`不仅可以切换分支，还可以直接切换到某个提交
>> git checkout HEAD^^</br>
git checkout master~5</br>
git checkout 78a4bc</br>
git checkout 78a4bc^</br>







