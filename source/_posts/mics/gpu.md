# GPU Programming

+ `nvidia-smi` 
+ `clinfo` 
+ `sudo lshw -C display` 
+ `glxinfo | egrep -i 'device|memory'` 
+ .
    ```
    #!/bin/sh
    #!/bin/bash
    wget https://developer.nvidia.com/compute/cuda/9.1/Prod/local_installers/cuda-repo-ubuntu1604-9-1-local_9.1.85-1_amd64
    sudo dpkg -i cuda-repo-ubuntu1604-9-1-local_9.1.85-1_amd64
    sudo apt-key add /var/cuda-repo-9-1-local/7fa2af80.pub
    sudo apt-get update -y
    sudo apt-get install cuda -y
    echo export PATH=$PATH:/usr/local/cuda/bin/>>~/.profile
    source ~/.bash_profile
    ```
