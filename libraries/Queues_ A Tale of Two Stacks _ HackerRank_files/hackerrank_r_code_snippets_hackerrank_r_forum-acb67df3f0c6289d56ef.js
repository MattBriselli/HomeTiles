(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{152:function(e,a){},I4xz:function(e,a,t){"use strict";var n=t("QbLZ"),l=t.n(n),r=t("Yz+Y"),s=t.n(r),c=t("iCc5"),m=t.n(c),o=t("V7oC"),i=t.n(o),p=t("FYw3"),u=t.n(p),d=t("mRg0"),E=t.n(d),h=t("cDcd"),g=t.n(h),b=t("17x9"),N=t.n(b),w=t("TSYQ"),k=t.n(w),v=t("ZaSc"),f=t("lJF8"),C=t("+38N"),x=t("k20a"),M=t.n(x),T=t("O766"),y=(t("ujCN"),function(e){function a(e){m()(this,a);var t=u()(this,(a.__proto__||s()(a)).call(this,e));return t.onChange=function(e){e!==t.state.currentDescription&&(t.previewOutdated=!0,t.setState({currentDescription:e}),t.props.onChange&&t.props.onChange(e))},t.previewMarkdown=function(e,a){return t.previewOutdated?(Object(v.f)({url:Object(f.d)("previewHackdown"),data:{payload:e}}).then(function(e){t.setState({previewText:e.html}),t.previewOutdated=!1,a.innerHTML=e.html},function(){a.innerHTML="Failed to load preview. Try again!"}),"Loading..."):t.state.previewText},t.getMdeInstance=function(e){var a=t.props.onFocus,n=e.codemirror;n.on("focus",function(){t.state.editorInFocus||t.setState({editorInFocus:!0}),a()}),t.codemirrorEditor=n},t.previewOutdated=!0,t.state={editorInFocus:!1,openMkdModal:!1},t.editorConfig=l()({spellChecker:!1,previewRender:t.previewMarkdown,renderingConfig:{codeSyntaxHighlighting:!0},toolbar:t.toolbarOptions(e),status:[]},e.options),t}return E()(a,e),i()(a,[{key:"renderMkdCheatSheet",value:function(){var e=this,a=this.state.openMkdModal;return g.a.createElement(T.a,{open:a,title:"Markdown Cheatsheet",onClose:function(){e.setState({openMkdModal:!1})},modalClass:"markdown-editor-dialog-container"},g.a.createElement("div",{className:"hr-dialog-body clearfix",style:{textAlign:"left"}},g.a.createElement("div",{className:"clearfix margin-large bottom"},g.a.createElement("div",{className:"row"},g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Formatting")),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},"#")," Header 1"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},"##")," Header 2"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},"######")," Header 6"),g.a.createElement("br",null),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"_"))," This text will be ",g.a.createElement("em",null,"italic")," ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"_"))),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))," This text will be ",g.a.createElement("em",null,"italic")," ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"__"))," This text will be ",g.a.createElement("strong",null,"bold")," ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"__"))),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"**"))," This text will be ",g.a.createElement("strong",null,"bold")," ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"**")))),g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Lists")),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))," Unordered list item"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))," Unordered list item"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))," Unordered list item"),g.a.createElement("br",null),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"1."))," Ordered list item"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"*"))," Unordered list item"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"2."))," Ordered list item")),g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Code Blocks")),g.a.createElement("pre",{style:{padding:"0px",border:"0px"}},g.a.createElement("span",{className:"beta"},"```python"),g.a.createElement("br",null),"import sys",g.a.createElement("br",null),"for line in sys.stdin:",g.a.createElement("br",null),"    print line",g.a.createElement("br",null),g.a.createElement("span",{className:"beta"},"```")),g.a.createElement("br",null),g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Inline Code")),g.a.createElement("p",null,"Use ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"`")),"<div>",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"`"))," tags"),g.a.createElement("small",{className:"beta"},"Two backticks to a character"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"``")),"echo `unname -a`",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"``"))),g.a.createElement("br",null)))),g.a.createElement("div",{className:"clearfix margin-large top bottom pjT"},g.a.createElement("div",{className:"row"},g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Blockquotes")),g.a.createElement("p",null,"Like Steve Jobs said:"),g.a.createElement("br",null),g.a.createElement("p",null,"> ","Here's to the crazy ones"),g.a.createElement("p",null,"> The misfits. The rebels.")),g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Images")),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"!")),"[first prize](/images/prize.png)"),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"!")),"[Alt Text](url)")),g.a.createElement("div",{className:"span-third"},g.a.createElement("h5",{className:"margin-small bottom"},g.a.createElement("strong",null,"Links")),g.a.createElement("p",null,"Checkout the next ",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"[HackerRank competition!](http://hackerrank.com/contests)"))),g.a.createElement("p",null,g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"[")),"inline text",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,"](")),"url",g.a.createElement("span",{className:"beta"},g.a.createElement("strong",null,")"))))))))}},{key:"toolbarOptions",value:function(e){var a=["bold","italic","heading","|","quote","unordered-list","ordered-list","|","link","image","|","preview"];return(this.props||e).showCodeSnippetToolbarOption&&a.splice(8,0,"code"),a}},{key:"render",value:function(){var e=this,a=this.props,t=a.showMkdCheatsheet,n=a.textValue,l=this.state.editorInFocus;return g.a.createElement("div",{className:k()("md-ed-wtbar",this.props.classNames)},g.a.createElement(C.a,null,g.a.createElement(M.a,{options:this.editorConfig,onChange:this.onChange,value:n,getMdeInstance:this.getMdeInstance})),t&&l&&g.a.createElement("p",{className:"psT psB pull-left markdown-hint txt-alt-grey xxsmall"},"Markdown is supported (",g.a.createElement("a",{onClick:function(){e.setState({openMkdModal:!0})},className:"mkd-cheat-sheet txt-alt-grey cursor dotted-border","data-analytics":"ShowMkdCheatsheet"},"Cheatsheet"),")."),t&&this.renderMkdCheatSheet())}}]),a}(g.a.Component));y.propTypes={textValue:N.a.string,onChange:N.a.func,onFocus:N.a.func,classNames:N.a.string,options:N.a.object,showMkdCheatsheet:N.a.bool,showCodeSnippetToolbarOption:N.a.bool},y.defaultProps={classNames:"",onFocus:function(){},showMkdCheatsheet:!1,showCodeSnippetToolbarOption:!1},a.a=y},ujCN:function(e,a,t){}}]);
//# sourceMappingURL=https://staging.hackerrank.net/assets/sourcemaps/hackerrank_r_code_snippets~hackerrank_r_forum-acb67df3f0c6289d56ef.js.map