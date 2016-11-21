$(document).ready(function(){

	// Start the home animation when the document has loaded
	$('.homeheading, .titletext, .titletextsmall, .leaddown div').css({
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

	//viewing skill details
	$('.skillslist').on('click', 'li', function(event) {
		var $skillstitle = $('.skillstitle');
		if ($skillstitle.offset().top < window.scrollY)
			{scrollToTop($skillstitle, 0);}

		var desc = $(this).attr('data-desc');
		var $skilldesc = $('.skilldesc');
		var $skilldescp = $skilldesc.find('p');
		$skillstitle.html($(this).html());

		$skilldesc.css('height',  $skilldescp.height());
		$skilldescp.html(desc);
		$skilldesc.css('height',  $skilldescp.height());
	});

	//opening and closing projects & blogs
	function articleClicked($article, category)
	{
		function openArticle($details){
			$details.slideDown("slow",function(){
				$details.find('.flexslider').flexslider({
					slideshowSpeed: 5000,
					animation: "slide",
				});
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
	$("#projects-section").on('click', '.viewproject', function (){
		articleClicked($(this).closest('.projectarticle'), "project");
	});
	$("#blog-section").on("click", '.blogsummary', function (){
		articleClicked($(this).parent(), "blog");
	});
	$("#projects-section").on('click', '.add-project-btn', function (){
		$(this).closest('.projectarticle').find('.add-project').slideToggle();
	});
	$("#projects-section").on('click', '.update-project-btn', function(){
		$(this).closest('.projectarticle').find(".update-project").slideToggle();
		return false;
	});
	$("#blog-section").on('click', '.add-blog-btn', function(){
		$('.add-blog').slideToggle();
	});
	$("#blog-section").on('click', '.update-blog-btn', function(){
		$(this).closest('.blogarticle').find(".update-blog").slideToggle(function(){
			$(this).closest('.blogarticle').find(".blogdetails").slideDown();
		});
		return false;
	});
	$("#blog-section").on('click', '.show-more-blog', function(){
		var limit = Session.get('limit') || 5;
		Session.set('limit',limit+5);
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

	//tooltips on skill list
	$( '.secondskillslist' ).tooltip();

	//links within projects and blogs will always open in a new tab/window
	$('#projects-section, #blog-section').on('click', '.projectsummary a, .blogdetails a', function(event){
		console.log('clicked');
		event.preventDefault();
		var href = $(event.target).attr('href');
		window.open(href,'_blank');
	});

});
