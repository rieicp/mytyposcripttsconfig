config.contentObjectExceptionHandler = 0

page = PAGE

## ------ Meta-Tags im <head> ------
### 参考 TSREF | setup | page
page.meta {
    X-UA-Compatible = IE=edge
    X-UA-Compatible.httpEquivalent = 1
    viewport = width=device-width, initial-scale=1, shrink-to-fit=no

    #本页面的'description'属性，即表格'page'的'description'栏
    description.field = description
    description.ifEmpty = Das ist ein Beispiel

    author.field = author
    author.ifEmpty = Max Mustermann

    keywords.field = keywords
    keywords.ifEmpty = keyword1,keyword2,keyword3
}

## ------ Favicon einbinden ------
page.shortcutIcon = EXT:mytyposcripttsconfig/Resources/Public/Icons/erzb_favicon.ico
##或者
/*
page.headerData.10 = TEXT
page.headerData.10.value (
    <link rel="icon" href="fileadmin/user_upload/erzb_favicon.ico">
)
*/

## ------ CSS einbinden ------
page.includeCSS {
    10 = EXT:mytyposcripttsconfig/Resources/Public/Css/bootstrap-flex.min.css
    20 = EXT:mytyposcripttsconfig/Resources/Public/Css/sm-core-css.css
    30 = EXT:mytyposcripttsconfig/Resources/Public/Css/sm-simple.css
    40 = EXT:mytyposcripttsconfig/Resources/Public/Css/smartmenu.css
    50 = EXT:mytyposcripttsconfig/Resources/Public/Css/mystyles.css
}

## ------ JS einbinden ------
### 参考 TSREF | setup | page
### includeJSFooterlibs 会先于(如) includeJSFooter ==> 被最先执行
page.includeJSFooterlibs {

    10 = http://code.jquery.com/jquery-3.1.1.min.js
    10.external = 1
    10.disableCompression = 1
}

page.includeJSFooter {

    10 = EXT:mytyposcripttsconfig/Resources/Public/JavaScript/bootstrap.min.js
    10.disableCompression = 1

    20 = EXT:mytyposcripttsconfig/Resources/Public/JavaScript/jquery.smartmenus.min.js
    20.disableCompression = 1

    30 = EXT:mytyposcripttsconfig/Resources/Public/JavaScript/custom.js
}

## ------ Template anwenden ------

temp.lastchanged = TEXT
temp.lastchanged {
    field = SYS_LASTCHANGED
    date = d.m.Y
    wrap = , Last changed: |
}

temp.lastcontent = COA
temp.lastcontent {
    20 = CONTENT
    20 {
        table = tt_content
        select {
            pidInList = 1
            ## recursive定义pidInList的子页面的级数
            recursive = 10
            orderBy = tstamp DESC
            max = 1
        }
        renderObj = COA
        renderObj {
            10 = TEXT
            10.field = tstamp
            10.date = d.m.Y
            10.wrap = , Last content: |
        }
    }
}

page.10 = FLUIDTEMPLATE
page.10 {

    layoutRootPath = EXT:mytyposcripttsconfig/Resources/Private/Layouts
    partialRootPath = EXT:mytyposcripttsconfig/Resources/Private/Partials

    file = EXT:mytyposcripttsconfig/Resources/Private/Templates/Default.html

    variables {

        lastchanged < temp.lastchanged

        lastcontent < temp.lastcontent

        content0 = CONTENT
        content0 {
            table = tt_content
            select.where = colPos=0
            select.orderBy = sorting
        }

        content1 < .content0
        content1.select.where = colPos=1

        content2 < .content0
        content2.select.where = colPos=2

        content3 < .content0
        content3.select.where = colPos=3

        content4 < .content0
        content4.select.where = colPos=4

        content5 < .content0
        content5.select.where = colPos=5

        backendlayout = CASE
        backendlayout {
            ## pagelayout是表格page中的一列，对应在Erscheinungsbild标签页中选择的Backend-Layout
            key.data = pagelayout

            ## 下一句意思是“如果key是pagets__jumbotron，则返回字符串'jumbotron'”
            ## pagets => Page TSConfig，见TSconfig/BackendLayouts.txt
            ## 总体意思是：如果在Erscheinungsbild标签页中选择了Backend-Layout名是'jumbotron'的话，则变量backendlayout的值为'jumbotron'
            pagets__jumbotron = TEXT
            pagets__jumbotron.value = jumbotron

            pagets__2spalten = TEXT
            pagets__2spalten.value = 2spalten

            pagets__1spalte = TEXT
            pagets__1spalte.value = 1spalte

            ## .号代表‘本Object’，将本Object的pagets__2spalten的内容复制给default
            default < .pagets__2spalten
        }

        siteTitle = TEXT
        siteTitle {
            value = {$siteTitle}
            stdWrap.typolink.parameter = t3://page?uid={$rootId}
            stdWrap.typolink.title = {$siteTitle} - zur Startseite
            wrap = <h2 class="nav-brand">|</h2>
        }
    }
}

## <body>标签根据本页面的Backend-Layout设置不同的class
## 以便于对不同的Layout分别进行响应
page.bodyTagCObject < page.10.variables.backendlayout
page.bodyTagCObject.stdWrap.wrap = <body class="layout-|">

/*
page.100 = TEXT
page.100.value = Guten Tag
page.100.wrap = <h1>|</h1>
    [hour = >6,<15]
page.100.value = Guten Morgen
    [hour]
    [hour = >18,<22]
page.100.value = Guten Abend
    [hour]
    [hour = >21] || [hour = <7]
page.100.value = Gute Nacht
    [hour]
*/
