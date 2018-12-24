lib.metanav = HMENU
lib.metanav {

    wrap = <ul class="metanav text-md-right">|</ul>

    special = directory
    ## 22 是文件夹mainnav的id
    special.value = 22

    1 = TMENU
    1 {
        NO = 1
        NO {
            allWrap = <li>|</li>
            stdWrap.htmlSpecialChars = 1
            ATagTitle.field = description // subtitle // title
        }

        CUR = 1
        CUR < .NO
        CUR.allWrap = <li><strong>|</strong></li>
    }
}
