lib.subnavigation = HMENU
lib.subnavigation {

    stdWrap.wrap = <div class="card"><div class="card-block"><ul class="nav nav-pills nav-stacked mysubnav">|</ul></div></div>
    stdWrap.required = 1

    ## 从页面树的第二层开始生成菜单
    entryLevel = 1

    1 = TMENU
    1 {
        NO = 1
        NO {
            wrapItemAndSub = <li class="nav-item">|</li>
            stdWrap.htmlSpecialChars = 1
            ATagTitle.field = description // subtitle // title
            ATagParams = class="nav-link"
        }

        CUR < .NO
        CUR.ATagParams = class="nav-link current"

        ## 当CUR位于某页面时，其所有父节点都为ACT
        ACT < .NO
        ACT.ATagParams = class="nav-link active"
    }

    2 < .1
    2.wrap = <ul>|</ul>

    3 < .2
    4 < .2
}
