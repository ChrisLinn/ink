# Vim Notes

## Setup
+ ~~[vim-plug](https://github.com/junegunn/vim-plug)~~
    * .
        ```
        curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
        ```
    * `:PlugInstall`
+ .vimrc
    + check out my `.vimrc` out [here](https://bitbucket.org/chris_linn/my-vimrc)
        * `git clone git@bitbucket.org:chris_linn/my-vimrc.git`
- [Powerline fonts](https://github.com/powerline/fonts)
    ```
    # clone
    git clone https://github.com/powerline/fonts.git
    # install
    cd fonts
    ./install.sh
    # clean-up a bit
    cd ..
    rm -rf fonts
    ```
    * Ubuntu Mono derivative Powerline
    * [Nerd-fonts?](https://github.com/ryanoasis/nerd-fonts)
    * Hack (nerd) font?
        - kubuntu's default font

## Shortcuts


## Commands
+ macro
```
qa...q
reg@a
@a[times]
let @a=''
```
