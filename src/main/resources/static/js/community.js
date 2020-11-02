function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val()
    comment2target(questionId, 1, content)

}

function comment2target(targetId, type, content){
    if (!content){
        alert("输入内容不能为空")
        return ;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: "application/json",
        data: JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": type
        }),
        success: function (response){
            if (response.code == 200){
                // $("#comment_section").hide()
                window.location.reload();
            }else {
                if (response.code == 2003){
                    var isAccepted = confirm(response.message);
                    if (isAccepted){
                        window.open("https://github.com/login/oauth/authorize?client_id=a4eceacdb0f4ddd96a92&redirect_uri=http://localhost:8887/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", true)
                    }
                }else {
                    alert(response.message)
                }

            }
            console.log(response)
        },
        dataType: "json"
    })
    // console.log(content)
}

function comment(e){
    var commentId = e.getAttribute("data-id")
    var content = $("#input-" + commentId).val()
    comment2target(commentId, 2, content)
}

function collapseComments(e){
    var id = e.getAttribute("data-id")
    var comments = $("#comment-" + id);

    var collapse = e.getAttribute("data-collapse");
    if (collapse){
        comments.removeClass("in")
        e.removeAttribute("data-collapse")
        e.classList.remove("active")
    }else {

        var subCommentContainer = $("#comment-" + id)
        if (subCommentContainer.children().length != 1){
            comments.addClass("in")
            e.setAttribute("data-collapse", "in")
            e.classList.add("active")
        }else {
            $.getJSON("/comment/" + id, function (data){

                $.each(data.data.reverse(), function (index,comment){

                    var mediaLeftElement = $("<div/>", {
                        "class": "media-left"
                    }).append($("<img/>", {
                        "class": "media-object img-rounded",
                        "src": comment.user.avatarUrl
                    }))

                    var mediaBodyElement = $("<div/>", {
                        "class": "media-body"
                    }).append($("<h5/>", {
                        "class": "media-heading",
                        "src": comment.user.name
                    })).append($("<div/>", {
                        html: comment.content
                    })).append($("<div/>", {
                        "class": "menu"
                    }).append($("<span/>", {
                        "class": "pull-right",
                        html: moment(comment.gmtCreate).format('YYYY-MM-DD')
                    })))
                    var mediaElement = $("<div/>", {
                        "class": "media"
                    })


                    mediaElement.append(mediaLeftElement).append(mediaBodyElement)
                    var commentElement = $("<div/>", {
                        "class": "col-lg-12 col-md-12 col-sm-12 col-xs-12 comments",
                    })
                    commentElement.append(mediaElement)
                    subCommentContainer.prepend(commentElement)
                })

            })

            comments.addClass("in")
            e.setAttribute("data-collapse", "in")
            e.classList.add("active")

        }


    }

    // console.log(id)
}

function selectTag(value){
    var previous = $("#tag").val();

    if (previous.indexOf(value) == -1){
        if (previous){
            $("#tag").val(previous + ',' + value);
        }else {
            $("#tag").val(value);
        }
    }

}

function showSelectTag(){
    $("#select-tag").show();
}