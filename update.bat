echo off
echo 'Updating'
git pull
echo 'setting git to replace git to https'
git config --global url."https://".insteadOf git:/
cmd /c npm install
git config --global --unset url."https://".insteadOf git:/
echo 'restoring git settings'
pause