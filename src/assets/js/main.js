// document.onreadystatechange = function() {
//     if (document.readyState === "interactive") {

//     }
// }
window.addEventListener("load", function () {
    // variables
    let rangeSliderAmount = document.querySelector(".calculator__range-amount")
    let rangeSliderTiming = document.querySelector(".calculator__range-timing")

    const $ABOUT_SWIPER = document.querySelector(".about__swiper"),
        $ABOUT_BLOCK = document.querySelector(".about__block"),
        $$ABOUT_BOX = document.querySelectorAll(".about__box"),
        $TIMING_CREDIT = document.querySelector("#timing-credit"),
        $AMOUNT_CREDIT = document.querySelector("#amount-credit"),
        $AMOUNT_UP = document.querySelector("#amount-up"),
        $AMOUNT_DOWN = document.querySelector("#amount-down"),
        $TIMING_UP = document.querySelector("#timing-up"),
        $TIMING_DOWN = document.querySelector("#timing-down"),
        $CREDIT_RATE = document.querySelector("#credit-rate"),
        $OVERPAYMENT = document.querySelector("#overpayment"),
        $$CALCULATOR_HEADER_CARD = document.querySelectorAll(".calculator__header-card"),
        $CALCULATOR_MAIN_TITLE = document.querySelector(".calculator__main-title"),
        $CALCULATOR_MAX = document.querySelector(".calculator__max"),
        $BEST_BLOCK = document.getElementsByClassName("best__block"),
        $HEAD_IMG = document.getElementsByClassName("head__img")

    const COEFF_PRECENT_DAY = 1 / 365,
        STEP_CALCULATOR_AMOUNT = 5000,
        STEP_CALCULATOR_TIMING = 10

    let $calculatorHeaderCardActive = document.querySelector(".calculator__header-card--active")

    const BREAK_POINT = [900, 1200]

    let timingCredit = parseInt($calculatorHeaderCardActive.getAttribute("data-timing")),
        percentCredit = parseFloat($calculatorHeaderCardActive.getAttribute("data-precent"))
    // /variables
    // ----------------------------------------------
    // universal function
    function clickArrowChange(rangeSlider, input, change, step) {
        change === "+" && rangeSlider.noUiSlider.set(parseInt(input.textContent) + step)
        change === "-" && rangeSlider.noUiSlider.set(parseInt(input.textContent) - step)
    }
    function calculateOverpayment() {
        $OVERPAYMENT.textContent =
            parseInt($TIMING_CREDIT.textContent) > timingCredit
                ? parseInt(
                      ((parseInt($AMOUNT_CREDIT.textContent) * percentCredit * COEFF_PRECENT_DAY) /
                          100) *
                          parseInt($TIMING_CREDIT.textContent)
                  ) + "₽"
                : "0₽"
    }
    //  /universal function
    // ----------------------------------------------
    // event
    $AMOUNT_UP.addEventListener(
        "click",
        clickArrowChange.bind(null, rangeSliderAmount, $AMOUNT_CREDIT, "+", STEP_CALCULATOR_AMOUNT)
    )
    $AMOUNT_DOWN.addEventListener(
        "click",
        clickArrowChange.bind(null, rangeSliderAmount, $AMOUNT_CREDIT, "-", STEP_CALCULATOR_AMOUNT)
    )
    $TIMING_UP.addEventListener(
        "click",
        clickArrowChange.bind(null, rangeSliderTiming, $TIMING_CREDIT, "+", STEP_CALCULATOR_TIMING)
    )
    $TIMING_DOWN.addEventListener(
        "click",
        clickArrowChange.bind(null, rangeSliderTiming, $TIMING_CREDIT, "-", STEP_CALCULATOR_TIMING)
    )
    for (const card of $$CALCULATOR_HEADER_CARD) {
        card.addEventListener("click", function () {
            timingCredit = parseInt(this.getAttribute("data-timing"))
            percentCredit = parseFloat(this.getAttribute("data-precent"))
            $CALCULATOR_MAIN_TITLE.textContent = this.getAttribute("data-name")
            $calculatorHeaderCardActive.classList.remove("calculator__header-card--active")
            this.classList.add("calculator__header-card--active")
            $calculatorHeaderCardActive = this
            calculateOverpayment()
            $CREDIT_RATE.textContent =
                parseInt($TIMING_CREDIT.textContent) > timingCredit ? percentCredit + "%" : "0%"
            $CALCULATOR_MAX.textContent = parseInt(
                $calculatorHeaderCardActive.getAttribute("data-max-amount")
            )
            rangeSliderAmount.noUiSlider.updateOptions({
                range: {
                    min: 10000,
                    max: ($CALCULATOR_MAX.textContent = parseInt(
                        $calculatorHeaderCardActive.getAttribute("data-max-amount")
                    )),
                },
            })
        })
    }
    // /event
    // ----------------------------------------------
    // unique function
    function initSwiper() {
        $ABOUT_SWIPER.classList.add("swiper-wrapper")
        $ABOUT_BLOCK.classList.add("swiper-wrapper")
        for (const slide of $$ABOUT_BOX) {
            slide.classList.add("swiper-slide")
        }
    }
    // /unique function
    // ----------------------------------------------
    // Page load
    window.innerWidth <= BREAK_POINT[0] &&
        (initSwiper(),
        new Swiper(".about__swiper", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".about__arrow--right",
                prevEl: ".about__arrow--left",
            },
            slidesOffsetBefore: 0,
            pagination: {
                el: ".about__pagination",
                type: "bullets",
            },
            spaceBetween: 20,
            paginationClickable: true,
            breakpoints: {
                501: {
                    slidesPerView: "auto",
                    slidesOffsetBefore: 20,
                },
            },
        }))
    window.innerWidth >= BREAK_POINT[0] &&
        new Swiper(".reviews__slider", {
            autoplay: {
                delay: 1400,
            },
            paginationClickable: true,
            grabCursor: true,
            effect: "coverflow",
            loop: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 0,
                stretch: 50,
                depth: 190,
                modifier: 3,
                slideShadows: false,
            },
            navigation: {
                nextEl: ".reviews__arrow--right",
                prevEl: ".reviews__arrow--left",
            },
            pagination: {
                el: ".reviews__pagination",
                type: "bullets",
            },
            breakpoints: {
                1201: {
                    coverflowEffect: {
                        depth: 50,
                    },
                },
            },
        })
    window.innerWidth <= BREAK_POINT[0] &&
        new Swiper(".reviews__slider", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".reviews__arrow--right",
                prevEl: ".reviews__arrow--left",
            },
            pagination: {
                el: ".reviews__pagination",
                type: "bullets",
            },
            spaceBetween: 20,
            autoHeight: true,
            paginationClickable: true,
        })
    noUiSlider.create(rangeSliderAmount, {
        start: $AMOUNT_CREDIT.getAttribute("data-start-amount"),
        connect: [true, false],
        step: STEP_CALCULATOR_AMOUNT,
        range: {
            min: 10000,
            max: parseInt($calculatorHeaderCardActive.getAttribute("data-max-amount")),
        },
    })
    noUiSlider.create(rangeSliderTiming, {
        start: 60,
        connect: [true, false],
        range: {
            min: 0,
            max: 100,
        },
        step: STEP_CALCULATOR_TIMING,
    })
    rangeSliderAmount.noUiSlider.on("update", (values, handle) => {
        $AMOUNT_CREDIT.textContent = Math.trunc(values) + " руб"
        calculateOverpayment()
    })
    rangeSliderTiming.noUiSlider.on("update", (values, handle) => {
        $TIMING_CREDIT.textContent = Math.trunc(values) + " дней"
        $CREDIT_RATE.textContent = values > timingCredit ? percentCredit + "%" : "0%"

        calculateOverpayment()
    })
    $CALCULATOR_MAX.textContent = parseInt(
        $calculatorHeaderCardActive.getAttribute("data-max-amount")
    )
    window.innerWidth >= BREAK_POINT[1] &&
        new simpleParallax($BEST_BLOCK, {
            overflow: true,
            orientation: "right",
            delay: 0.6,
            transition: "cubic-bezier(0,0,0,1)",
            maxTransition: 50,
        })
    window.innerWidth >= BREAK_POINT[1] &&
        new simpleParallax($HEAD_IMG, {
            overflow: true,
            orientation: "down",
        })
    window.innerWidth >= BREAK_POINT[1] && AOS.init()
    window.innerWidth <= BREAK_POINT[1] &&
        document.querySelectorAll("[data-aos]").forEach((item) => {
            item.removeAttribute("data-aos")
        })
    // /Page load
})
