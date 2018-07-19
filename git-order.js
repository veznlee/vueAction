说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。
^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。...


从 GitHub 把中央仓库 clone 到本地（使用命令： git clone）
把写完的代码提交（先用 git add 文件名 把文件添加到暂存区，再用 git commit -m '提交说明' 提交）
在这个过程中，可以使用 git status 来随时查看工作目录的状态
每个文件有 "changed / unstaged"（已修改）, "staged"（已修改并暂存）, "commited"（已提交） 三种状态，以及一种特殊状态 "untracked"（未跟踪）
提交一次或多次之后，把本地提交 push 到中央仓库（git push）

//常用命令
git add .
git commit -m ''
git pull
git merge branch
git push origin branch

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

//分支管理
git branch branch
git checkout branch
git checkout -b branch
git branch -d feature1

git checkout feature1
git push origin feature1

git branch -d books
git push origin -d books


//错误提交解决方案
1、修改并新增commit
2、git commit --amend  修复最新 commit 的错误
3、git rebase -i HEAD^^
交互式 rebase 最常用的场景是修改写错的 commit，但也可以用作其他用途。它的大致用法：

使用方式是 git rebase -i 目标commit；
在编辑界面中指定需要操作的 commits 以及操作类型；
操作完成之后用 git rebase --continue 来继续 rebase 过程。

4、git rebase -i HEAD^^ 撤销提交
5、git revert HEAD^



//其他
查看历史中的多个 commit：log
查看详细改动： git log -p
查看大致改动：git log --stat
查看具体某个 commit：show
要看最新 commit ，直接输入 git show ；要看指定 commit ，输入 git show commit的引用或SHA-1
如果还要指定文件，在 git show 的最后加上文件名
查看未提交的内容：diff
查看暂存区和上一条 commit 的区别：git diff --staged（或 --cached）
查看工作目录和暂存区的区别：git diff 不加选项参数
查看工作目录和上一条 commit 的区别：git diff HEAD

q退出日志查看
git checkout不仅可以切换分支，还可以直接切换到某个提交
git checkout HEAD^^
git checkout master~5
git checkout 78a4bc
git checkout 78a4bc^




