<?php

/** @var \Kirby\Cms\Block $block */
$alt     = $block->alt();
$caption = $block->caption();
$crop    = $block->crop()->isTrue();
$link    = $block->link();
$ratio   = $block->ratio()->or('auto');
$src     = null;

if ($block->location() == 'web') {
	$src = $block->src()->esc();
} elseif ($image = $block->image()->toFile()) {
	$alt = $alt->or($image->alt());
	$src = $image->url();
}

?>
<?php if ($src) : ?>
	<figure <?= $block->attr(['class' => 'drop-shadow-lg ' . $class]) ?><?= Html::attr(['data-ratio' => $ratio, 'data-crop' => $crop], null, ' ') ?>>
		<?php if ($link->isNotEmpty()) : ?>
			<a href="<?= Str::esc($link->toUrl()) ?>">
			<?php endif ?>
			<?php if ($block->location() == 'web') : ?>
				<img class="rounded-lg" src="<?= $src ?>" alt="<?= $alt->esc() ?>">
			<?php else : ?>
				<?php snippet(
					'picture',
					array('alt' => $alt, 'image' => $image, 'imgClass' => 'rounded-lg')
				) ?>
			<?php endif ?>
			<?php if ($link->isNotEmpty()) : ?>
			</a>
		<?php endif ?>

		<?php if ($caption->isNotEmpty()) : ?>
			<figcaption>
				<?= $caption ?>
			</figcaption>
		<?php endif ?>
	</figure>
<?php endif ?>