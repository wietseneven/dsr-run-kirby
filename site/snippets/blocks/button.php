<?php

/** @var \Kirby\Cms\Block $block */ ?>
<a href="<?= $block->link()->toUrl(); ?>" class="button inline-flex items-center gap-2">
	<?= $block->label(); ?>
	<?php if ($block->icon()->isNotEmpty()) : ?>
		<?= snippet('icon', ['type' => $block->icon(), 'class' => 'w-6 h-6']); ?>
	<?php endif; ?>
</a>