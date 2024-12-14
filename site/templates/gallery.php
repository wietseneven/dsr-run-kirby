<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Page $page
 * @var Kirby\Cms\Site $site
 */

snippet('layout', slots: true); ?>
<div class="w-[90%] max-w-7xl mx-auto">
	<nav aria-label="Breadcrumb" class="print:hidden mt-8 py-8">
		<ol aria-label="breadcrumbs" class="flex flex-wrap items-center gap-3">
			<?php foreach ($site->breadcrumb() as $crumb) : ?>
				<?php $is_last = $crumb === $site->breadcrumb()->last() ?>
				<li class="leading-none flex <?php e(!$is_last, "after:content['>'] after:ml-3 after:inline-block after:w-4 after:h-4 after:bg-black after:[mask-image:url('/assets/icons/chevron-right.svg')]") ?>">
					<a class="hover:text-dsr-orange" property="item" typeof="WebPage" href="<?= $crumb->url() ?>"><?= $crumb->title() ?></a>
				</li>
			<?php endforeach ?>
		</ol>
	</nav>
	<header class="lg:mt-6 gap-4 items-center justify-between col-span-2 prose">
		<h1 class="h1 !block text-2xl sm:text-4xl lg:!text-6xl text-black">Foto's - <?= $page->title() ?></h1>
		<h2 class="h2 block text-2xl print:text-[14pt] text-dsr-orange print:mb-0">Bekijk nu de foto's</h2>
	</header>
</div>
<?php
$catFilter = get('category');
$obstacleFilter = get('obstacle');
$allImages = $page->images()->filterBy('template', 'gallery-image');
$categories = $allImages->pluck('categories', ',', true);
$obstacles = $allImages->pluck('obstacles', ',', true);
sort($obstacles);
?>
<?php
$categoryCounts = [];
$filterCatagoryImages = $allImages;
if ($catFilter) $filterCatagoryImages = $filterCatagoryImages->filterBy('categories', $catFilter, ',');

$filterObstacleImages = $allImages;
if ($obstacleFilter) $filterObstacleImages = $filterObstacleImages->filterBy('obstacles', $obstacleFilter, ',');

foreach ($categories as $category) {
	$categoryCounts[$category] = $filterObstacleImages->filterBy('categories', $category, ',')->count();
}

$obstacleCounts = [];
foreach ($obstacles as $obstacle) {
	$obstacleCounts[$obstacle] = $filterCatagoryImages->filterBy('obstacles', $obstacle, ',')->count();
}

if ($catFilter) {
	$allImages = $allImages->filterBy('categories', $catFilter, ',');
}
if ($obstacleFilter) {
	$allImages = $allImages->filterBy('obstacles', $obstacleFilter, ',');
}
?>
<?php $images = $allImages->paginate(32) ?>
<?php $pagination = $images->pagination() ?>
<div data-controller="gallery" class="grid grid-cols-1 lg:grid-cols-[300px,1fr] xl:grid-cols-[350px,1fr] gap-4 mt-8 items-start">
	<form data-action="change->gallery#filter" data-gallery-target="form" action="<?= $page->url() ?>" method="get" class="grid gap-4 items-start bg-dsr-orange py-4 lg:p-4 xl:p-6 pb-8 lg:sticky top-[7.25rem] mb-4 prose">
		<div class="w-[90%] mx-auto lg:w-full">
			<h2 class="h2 block text-2xl text-black">Filter de foto's</h2>
			<div class="mb-4">
				<label for="category">Categorie</label>
				<select class="block px-4 py-2 border w-full" id="category" name="category">
					<option value="">Alle categorieën</option>
					<?php foreach ($categories as $category) : ?>
						<option value="<?= $category ?>" <?= $catFilter === $category ? 'selected' : '' ?> <?= $categoryCounts[$category] === 0 ? 'disabled' : '' ?>><?= $category ?> (<?= $categoryCounts[$category] ?>)</option>
					<?php endforeach ?>
				</select>
			</div>
			<div>
				<label for="obstacle">Hindernis</label>
				<select class="block px-4 py-2 border w-full" id="obstacle" name="obstacle">
					<option value="">Alle hindernissen</option>
					<?php foreach ($obstacles as $obstacle) : ?>
						<option value="<?= $obstacle ?>" <?= $obstacleFilter === $obstacle ? 'selected' : '' ?> <?= $obstacleCounts[$obstacle] === 0 ? 'disabled' : '' ?>><?= $obstacle ?> (<?= $obstacleCounts[$obstacle] ?>)</option>
					<?php endforeach ?>
				</select>
			</div>
			<hr class="block my-6 border-black">
			<p class="font-medium">Wil je jouw foto liever niet meer online hebben staan?</p>
			<p>Laat het ons weten door te mailen naar <a class="underline" href="mailto:run@dinkelsurvivalrun.nl">run@dinkelsurvivalrun.nl</a>.</p>
		</div>
	</form>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" data-gallery-target="gallery">
		<?php foreach ($images as $image) : ?>
			<?php snippet('gallery/image', ['image' => $image, 'index' => $allImages->indexOf($image)]) ?>
		<?php endforeach ?>
	</div>

	<nav>
		<ul class="flex gap-2 justify-center [&_a]:px-2">
			<?php if ($pagination->hasPrevPage()): ?>
				<li>
					<a href="<?= $pagination->prevPageURL() ?>">‹</a>
				</li>
			<?php else: ?>
				<li>
					<span>‹</span>
				</li>
			<?php endif ?>

			<?php foreach ($pagination->range(10) as $r): ?>
				<li>
					<a class="[&[aria-current='page']]:text-dsr-orange hover:text-dsr-orange" <?= $pagination->page() === $r ? ' aria-current="page"' : '' ?> href="<?= $pagination->pageURL($r) ?>">
						<?= $r ?>
					</a>
				</li>
			<?php endforeach ?>

			<?php if ($pagination->hasNextPage()): ?>
				<li>
					<a href="<?= $pagination->nextPageURL() ?>">›</a>
				</li>
			<?php else: ?>
				<li>
					<span>›</span>
				</li>
			<?php endif ?>

		</ul>
	</nav>

	<?php
	$galleryImages = [];
	foreach ($allImages as $image) {
		$thumb = $image->thumb(['width' => 1600]);
		$galleryImages[] = array(
			'id' => $allImages->indexOf($image),
			'src' => $thumb->url(),
			'srcset' => $image->srcset(),
			'url' => $image->url(),
			'width' => $thumb->width(),
			'height' => $thumb->height(),
		);
	}
	?>
	<script type="text/javascript">
		window.galleryImages = <?= json_encode($galleryImages) ?>;
	</script>

	<?php endsnippet() ?>