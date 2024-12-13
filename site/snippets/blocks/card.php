<?php
$card_class = '';
if ($block->background()->isNotEmpty()) {
	$card_class = ' card card-' . $block->background();
}
if ($block->icon()->isNotEmpty()) {
	$card_class .= ' gap-4 flex pl-4 pr-6';
}

// [&>.card-black]:self-start
?>
<article <?= $block->attr(['class' => [$class, $card_class, 'relative group']]) ?>>
	<?php if ($block->icon()->isNotEmpty()) : ?>
		<?= snippet('icon', ['type' => $block->icon(), 'class' => 'w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 flex-shrink-0']); ?>
	<?php endif; ?>

	<div class="w-full prose flex flex-col">
		<h2 class="group-[.col-span-4]:text-xl"><?= $block->title(); ?></h2>
		<?= $block->text(); ?>

		<?php if ($block->link()->isNotEmpty()) : ?>
			<a href="<?= $block->link()->toUrl(); ?>" class="not-prose font-medium mt-auto flex gap-2 items-center underline underline-offset-2 link-cover">
				<?= $block->label(); ?>
				<?= snippet('icon', ['type' => 'arrow-right', 'class' => 'w-6 h-6']); ?>
			</a>
		<?php endif; ?>
	</div>
</article>