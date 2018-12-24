/*
* 参考 TSREF | Content Objects (cObject) | IMG_RESOURCE (property:file, datatype:imgResource)
* 参考 TSREF | Data types | imgResource
* 参考 TSREF | Functions | imgResource (import)
*/
temp.jumbotronbg = IMG_RESOURCE
temp.jumbotronbg {
    file {
        ## 参考levelmedia
        import.data = levelmedia:-1, slide
        treatIdAsReference = 1
        import.listNum = rand
    }
}

## 参考 TSREF | setup | page
### 注意：要在id=1的页面添加media(图片)
page.headerData.235039700 < temp.jumbotronbg
page.headerData.235039700.stdWrap.wrap = <style>.jumbotron {background: url(|) top left no-repeat; background-size: cover; }</style>
