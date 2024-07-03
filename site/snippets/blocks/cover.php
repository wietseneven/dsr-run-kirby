<section <?= $block->attr(['class' => 'relative min-h-screen overflow-hidden pt-32 flex flex-col justify-center gradient-overlay ' . $class]) ?>>
	<?php if ($video = $block->video()->toFile()) : ?>
		<video class="absolute inset-0 object-cover h-full w-full" src="<?= $video->url(); ?>" autoPlay loop muted playsInline>
		</video>
	<?php endif ?>
	<div class="max-w-6xl mt-auto mx-auto text-white z-20 relative text-center mb-16 w-[90%] uppercase font-bold font-extra-expanded">
		<h1 class="mt-auto uppercase flex flex-col text-lg md:text-xl leading-none text-shadow-lg">
			<span class="text-[1.585em] leading-none"><?= $block->topLine(); ?></span>
			<span class="text-[6.25em] font-black leading-none"><?= $block->middleLine(); ?></span>
			<span class="text-[2.5em] font-black leading-[0.5]">
				<?= $block->bottomLine(); ?>
			</span>
		</h1>
		<div class="flex flex-wrap my-8 justify-center gap-x-8 gap-y-4">
			<?php foreach ($block->buttons()->toStructure() as $button) : ?>
				<a class="px-6 py-3 rounded bg-dsr-orange hover:bg-dsr-orange-400 inline-block text-black" href="<?= $button->url()->toUrl(); ?>">
					<?= $button->text(); ?>
				</a>
			<?php endforeach ?>
		</div>
	</div>
	<div class="mt-auto relative z-20 py-2 bg-white">
		<?php if ($sponsor_url = $site->sponsor_url()) : ?>
			<?php $sponsor_logo = $site->sponsor_logo()->toFile() ?>
			<?php $sponsor_name = $site->sponsor_name() ?>
			<div class="bg-white absolute flex sm:flex-col gap-x-4 top-0 -translate-y-full inset-x-4 sm:left-[inherit] sm:right-8 p-4 pb-0 rounded-t-xl sm:max-w-sm [&>a]:w-[150px] sm:[&>a]:w-[150px] lg:[&>a]:w-[200px] xl:[&>a]:w-[320px] prose">
				<h2 class="lg:text-lg mb-2 mt-0">Trotse hoofdsponsor</h2>
				<a class="not-prose" href="<?= $sponsor_url; ?>">
					<?php if ($sponsor_logo) : ?>
						<img alt="<?= $sponsor_logo->alt(); ?>" width="<?= $sponsor_logo->width(); ?>" height="<?= $sponsor_logo->height(); ?>" src="<?= $sponsor_logo->url(); ?>" />
					<?php else : ?>
						<?= $sponsor_name; ?>
					<?php endif ?>
				</a>
			</div>
		<?php endif ?>
		<div class="" data-controller="sponsor-carousel">
			<div class="swiper-container" data-target="sponsor-carousel.container">
				<div class="swiper-wrapper" data-target="sponsor-carousel.wrapper">
					<?php foreach ($block->sponsors()->toStructure() as $sponsor) : ?>
						<div class="swiper-slide" data-target="sponsor-carousel.slide">
							<a href="<?= $sponsor->url(); ?>">
								<img alt="<?= $sponsor->name(); ?>" src="<?= $sponsor->image()->url(); ?>" />
							</a>
						</div>
					<?php endforeach ?>
				</div>
			</div>
			<div class="swiper-pagination" data-target="sponsor-carousel.pagination"></div>
		</div>
	</div>
</section>
