;; Simple Counter Contract (Clarity 4)

;; -----------------------------
;; Data Variables
;; -----------------------------
(define-data-var count uint u0)
(define-data-var registration-fee uint u10)
(define-data-var contract-owner (optional principal) none)

;; -----------------------------
;; Read-only Functions
;; -----------------------------
(define-read-only (get-count)
  (var-get count)
)

;; REQUIRED: Clarity 4
;; Format principal as ASCII string
(define-read-only (get-owner-as-string (owner principal))
  (to-ascii? owner)
)

;; REQUIRED: Clarity 4
;; Format fee as ASCII string
(define-read-only (get-registration-fee-as-string)
  (to-ascii? (var-get registration-fee))
)

;; -----------------------------
;; Public Functions
;; -----------------------------
(define-public (increment)
  (begin
    (var-set count (+ (var-get count) u1))
    (ok (var-get count))
  )
)

;; ✅ Added Decrement Function
(define-public (decrement)
  (if (> (var-get count) u0)
    (begin
      (var-set count (- (var-get count) u1))
      (ok (var-get count))
    )
    (err u400) ;; cannot decrement below 0
  )
)

;; -----------------------------
;; Admin (optional, simple)
;; -----------------------------
(define-public (set-owner (owner principal))
  (if (is-none (var-get contract-owner))
    (begin
      (var-set contract-owner (some owner))
      (ok owner)
    )
    (err u401)
  )
)
