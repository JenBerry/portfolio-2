$(document).ready(function(){

	// Start the home animation when the document has loaded
	$('.homeheading, .titleimage, .leaddown div').css({
		opacity: 1,
		left:0,
		top:0
	});

	//scrolling to bookmarks
	function scrollToTop($element, offset){
		$('html,body').animate({
			'scrollTop': $element.offset().top-offset},
			1000);
	}

	$(document).on('click', 'a.scroll', function(event) {
			event.preventDefault();
			var href=$(this).attr('href');
			href = href.replace("#","");
			scrollToTop($('a[name='+href+']'), 50);
		});


	//opening and closing projects & blogs
	function articleClicked($article, category)
	{
		function openArticle($details){
			$details.slideDown("slow",function(){
			});
		}
		function closeArticle($details){
			$details.slideUp("slow",function(){
			});
		}
		function closeAllArticles(){
			var $allArticles = $("."+category+"article");
			$allArticles.each(function(){
				closeArticle($(this).find("."+category+"details"));
			});
		}

		var $details = $article.find("."+category+"details");
		if ($details.css('display')!="none") {
			closeArticle($details);
			
		}
		else
		{
			openArticle($details);
		}
	}

		//detect click on list, since summary elements may be dynamically created
	$(document).on('click', '.viewproject', function (){
		articleClicked($(this).parent().parent(), "project");
	});
	$(document).on("click", '.blogsummary', function (){
		articleClicked($(this).parent(), "blog");
	});

	//prevent default action of link
	$(document).on('click','a.prevent-default',function(event){
		event.preventDefault();
	});

	//vertical center
	function verticalCenter($elements)
	{
		$elements.each(function(){
			var elementHeight = $( this ).height();
			var parentHeight = $( this ).parent().height();
			var offset = parentHeight/2 - elementHeight/2;
			$( this ).parent().css('position', 'relative');
			$( this ).css('position','absolute');
			$( this ).css('top', offset);
		});
	}
	verticalCenter($('.verticalcenter'));


});
