<?php

/** @var \Kirby\Cms\Block $block */ ?>
<div <?= $block->attr(['class' => $class ?? null]) ?>>
	<?= $block->text(); ?>
</div>