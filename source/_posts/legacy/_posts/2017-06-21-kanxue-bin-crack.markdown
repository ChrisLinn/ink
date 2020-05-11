---
layout:     post
title:      "[DRAFT杂乱笔记] 《加密与解密》 Notes"
date:       2017-06-21 17:10:00
author:     "LiqueurTofu"
header-img: "img/home-bg-art.jpg"
catalog:    true
tags:
    - DRAFT杂乱笔记
---

<br>

# 一 基础知识
+ 字节存储顺序
    * Big-Endian
    * Little-Endian
+ Windows
    * 三个主要子系统
        - Kernel
        - User
        - GDI
    * 常用 Win32 API 函数
    * 消息机制
+ 保护模式
    * 虚拟内存
    * 虚拟地址与物理地址
+ PE 格式
    * 区块
    * 名词
    * LoadPE

```
// 2.1.TraceMe.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <windows.h> 

unsigned char Table[8] = {0xC,0xA,0x13,0x9,0xC,0xB,0xA,0x8};    //计算序列号要用的数据表，全局变量

void GenRegCode(TCHAR  *name ,int len)
{   
    int i,j;
    unsigned long code=0; 

    for(i=3,j=0;i<len;i++,j++) 
         {if(j>7) j=0; 
           code+=((BYTE)name[i])*Table[j];                                                                                                  
          } 

    printf("%ld", code);
}


int main(int argc, char* argv[])
{   
    char name[999]={0};
    int len = 0;
    scanf("%s", name);
    while(name[len++]!=0){
    };
    GenRegCode(name, len-1);

    return 0;
}
```
