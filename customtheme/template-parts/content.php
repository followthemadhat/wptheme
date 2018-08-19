<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package customtheme
 */

?>

<div class="post">
	<div class="post-image" style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>);">
		<a href="<?php echo the_permalink(); ?>"></a>
	</div>
	<div class="post-content">
		<a href="<?php echo the_permalink(); ?>"><h4><?php echo the_title(); ?></h4></a>
		<div class="post-meta">
			<span class="post-date"><?php echo get_the_date(); ?></span><span class="post-category"><?php the_category(); ?></span>
		</div>
		<p><?php echo get_the_excerpt(); ?></p>
		<a href="<?php echo the_permalink(); ?>" class="post-link button">Read more</a>
	</div>
</div>
