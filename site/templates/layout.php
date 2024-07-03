<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Page $page
 * @var Kirby\Cms\Site $site
 */

snippet('layout', slots: true); ?>
<?php if (!isset($header_hidden)) { ?>
	<?php snippet('core/header') ?>
<?php } ?>
<?php foreach ($page->layout()->toLayouts() as $layout) : ?>
	<?php /*
	card-black card-orange card-blue
	*/ ?>
	<section class="grid gap-6 lg:gap-8 lg:grid-cols-12<?php e($layout->background()->isNotEmpty(), ' card card-' . $layout->background()) ?><?php e($layout->container() == 'full-width', '', ' max-w-7xl mx-auto z-20 w-[90%]') ?><?php e(in_array($layout->spacing(), ['default', 'no-bottom']), ' mt-24') ?><?php e(in_array($layout->spacing(), ['default', 'no-top']), ' mb-12') ?>" id="<?= $layout->id() ?>">
		<?php /*
		col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
		*/ ?>
		<?php foreach ($layout->columns() as $column) : ?>
			<?php // if there is only one block in the column, add the span to the block, otherwise wrap all blocks in a div with the span
			?>
			<?php if ($column->blocks()->count() === 1) : ?>
				<?php $block = $column->blocks()->first() ?>
				<?php snippet('blocks/' . $block->type(), ['block' => $block, 'layout' => $layout, 'class' => 'col-span-' . $column->span()]) ?>
				<?php continue ?>
			<?php endif ?>
			<div class="col-span-<?= $column->span() ?> prose">
				<?php foreach ($column->blocks() as $block) : ?>
					<?php snippet('blocks/' . $block->type(), ['block' => $block, 'layout' => $layout]) ?>
				<?php endforeach ?>
			</div>
		<?php endforeach ?>
	</section>
<?php endforeach ?>

<?= $page->blocks()->toBlocks() ?>
<?php endsnippet() ?>