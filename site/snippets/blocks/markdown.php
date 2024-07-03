<?php

/** @var \Kirby\Cms\Block $block */ ?>
<div <?= $block->attr(['class' => ['rounded-lg', $class]]) ?>>
	<?= $block->text()->kt(); ?>
</div>