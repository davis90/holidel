const BASE_URL = 'http://localhost:4000'
const OFFERS_ENDPOINT = `${BASE_URL}/offers`

interface TestResult {
    name: string
    passed: boolean
    statusCode?: number
    error?: string
    resultsCount?: number
}

const results: TestResult[] = []

/**
 * Helper function to build query string from params
 */
function buildQueryString(params?: Record<string, string | number>): string {
    const searchParams = new URLSearchParams()
    Object.entries(params ?? {}).forEach(([key, value]) => searchParams.append(key, String(value)))
    return searchParams.toString()
}

/**
 * Helper function to extract filter field values from offers
 */
function extractFilterFields(offer: any, filterParams: Record<string, string | number>): Record<string, any> {
    const filterFields: Record<string, any> = {}

    Object.keys(filterParams).forEach(key => {
        if (key === 'page' || key === 'limit' || key === 'nurseId') {
            return // Skip pagination and nurse ID
        }

        // Map filter params to offer fields
        if (key === 'nbDaysMin') filterFields['nbDaysMin'] = offer.nbDaysMin
        if (key === 'nbDaysMax') filterFields['nbDaysMax'] = offer.nbDaysMax
        if (key === 'retrocessionRateMin' || key === 'retrocessionRateMax') {
            filterFields['retrocessionRate'] = offer.retrocessionRate
        }
        if (key === 'averageTechnicalCareDayMin' || key === 'averageTechnicalCareDayMax') {
            filterFields['averageTechnicalCareDay'] = offer.averageTechnicalCareDay
        }
        if (key === 'averageKilometersDayMin' || key === 'averageKilometersDayMax') {
            filterFields['averageKilometersDay'] = offer.averageKilometersDay
        }
        if (key === 'averageConsultationsDayMin' || key === 'averageConsultationsDayMax') {
            filterFields['averageConsultationsDay'] = offer.averageConsultationsDay
        }
    })

    return filterFields
}

/**
 * Helper function to make requests and handle errors
 */
async function testFilter(
    filterName: string,
    queryParams: Record<string, string | number>
): Promise<TestResult> {
    try {
        console.log(`\n📝 Testing: ${filterName}`)
        console.log(`   Query: ${JSON.stringify(queryParams)}`)

        const url = `${OFFERS_ENDPOINT}?${buildQueryString(queryParams)}`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(url, {
            method: 'GET',
            signal: controller.signal
        })

        clearTimeout(timeoutId)

        const data = await response.json()
        const resultsCount = data?.data?.length || 0
        console.log(`   ✅ Status: ${response.status} | Results: ${resultsCount}`)

        // Display only filter field values
        if (resultsCount > 0 && Object.keys(queryParams).length > 0) {
            console.log(`   Filter values:`)
            data.data.forEach((offer: any, index: number) => {
                const filterFields = extractFilterFields(offer, queryParams)
                if (Object.keys(filterFields).length > 0) {
                    console.log(`     [${index + 1}] ${JSON.stringify(filterFields)}`)
                }
            })
        }

        return {
            name: filterName,
            passed: response.status === 200,
            statusCode: response.status,
            resultsCount
        }
    } catch (error) {
        console.log('///////////////////')
        console.log(error)
        console.log('///////////////////')
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.log(`   ❌ Error: ${errorMessage}`)

        return {
            name: filterName,
            passed: false,
            error: errorMessage
        }
    }
}

/**
 * Run all filter tests
 */
async function runAllTests(): Promise<void> {
    console.log('🚀 Starting Offers API Filter Tests')
    console.log(`Base URL: ${BASE_URL}`)
    console.log('='.repeat(60))

    // Test 1: Basic request without filters
    results.push(await testFilter(
        'No filters (get all offers)',
        {}
    ))

    // Test 2: Pagination
    results.push(await testFilter(
        'Pagination - Page 1, Limit 5',
        {page: '1', limit: '5'}
    ))

    results.push(await testFilter(
        'Pagination - Page 2, Limit 10',
        {page: '2', limit: '10'}
    ))

    // Test 3: nurseId filter
    results.push(await testFilter(
        'Filter by nurseId',
        {nurseId: 'b9925e90-9a79-40be-9a48-1c0851027c84'}
    ))

    // Test 4: nbDays filter (min/max of the field nbDaysMin and nbDaysMax)
    results.push(await testFilter(
        'Filter nbDays between 5 and 10',
        {nbDaysMin: '5', nbDaysMax: '10'}
    ))

    results.push(await testFilter(
        'Filter nbDays minimum 15',
        {nbDaysMin: '15'}
    ))

    results.push(await testFilter(
        'Filter nbDays maximum 30',
        {nbDaysMax: '30'}
    ))

    // Test 5: retrocessionRate filter
    results.push(await testFilter(
        'Filter retrocessionRate between 10 and 50',
        {retrocessionRateMin: '10', retrocessionRateMax: '50'}
    ))

    results.push(await testFilter(
        'Filter retrocessionRate minimum 20',
        {retrocessionRateMin: '10'}
    ))

    results.push(await testFilter(
        'Filter retrocessionRate maximum 60',
        {retrocessionRateMax: '40'}
    ))

    // Test 6: averageTechnicalCareDay filter
    results.push(await testFilter(
        'Filter averageTechnicalCareDay between 2 and 8',
        {averageTechnicalCareDayMin: '2', averageTechnicalCareDayMax: '8'}
    ))

    results.push(await testFilter(
        'Filter averageTechnicalCareDay minimum 3',
        {averageTechnicalCareDayMin: '3'}
    ))

    results.push(await testFilter(
        'Filter averageTechnicalCareDay maximum 10',
        {averageTechnicalCareDayMax: '10'}
    ))

    // Test 7: averageKilometersDay filter
    results.push(await testFilter(
        'Filter averageKilometersDay between 50 and 200',
        {averageKilometersDayMin: '50', averageKilometersDayMax: '200'}
    ))

    results.push(await testFilter(
        'Filter averageKilometersDay minimum 100',
        {averageKilometersDayMin: '100'}
    ))

    results.push(await testFilter(
        'Filter averageKilometersDay maximum 300',
        {averageKilometersDayMax: '120'}
    ))

    // Test 8: averageConsultationsDay filter
    results.push(await testFilter(
        'Filter averageConsultationsDay between 1 and 5',
        {averageConsultationsDayMin: '1', averageConsultationsDayMax: '5'}
    ))

    results.push(await testFilter(
        'Filter averageConsultationsDay minimum 2',
        {averageConsultationsDayMin: '2'}
    ))

    results.push(await testFilter(
        'Filter averageConsultationsDay maximum 10',
        {averageConsultationsDayMax: '10'}
    ))

    // Test 9: Combined filters
    results.push(await testFilter(
        'Combined: nurseId + nbDays + retrocessionRate',
        {nurseId: 'b9925e90-9a79-40be-9a48', nbDaysMin: '5', nbDaysMax: '20', retrocessionRateMin: '10'}
    ))

    results.push(await testFilter(
        'Combined: Multiple technical criteria',
        {
            averageTechnicalCareDayMin: '2',
            averageKilometersDayMax: '250',
            averageConsultationsDayMin: '1'
        }
    ))

    // Test 10: Edge cases
    results.push(await testFilter(
        'Edge case: High nbDays values',
        {nbDaysMin: '100', nbDaysMax: '365'}
    ))

    results.push(await testFilter(
        'Edge case: Low retrocessionRate values',
        {retrocessionRateMin: '0', retrocessionRateMax: '5'}
    ))

    // Print summary
    printSummary()
}

/**
 * Print test results summary
 */
function printSummary(): void {
    console.log('\n' + '='.repeat(60))
    console.log('📊 TEST SUMMARY')
    console.log('='.repeat(60))

    const passedTests = results.filter(r => r.passed).length
    const failedTests = results.filter(r => !r.passed).length
    const totalTests = results.length

    console.log(`\nTotal Tests: ${totalTests}`)
    console.log(`✅ Passed: ${passedTests}`)
    console.log(`❌ Failed: ${failedTests}`)
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`)

    if (failedTests > 0) {
        console.log('\n⚠️  Failed Tests:')
        results
            .filter(r => !r.passed)
            .forEach(r => {
                console.log(`   - ${r.name}`)
                console.log(`     Error: ${r.error}`)
            })
    }

    console.log('\n' + '='.repeat(60))
    console.log('Test run completed at:', new Date().toISOString())
    console.log('='.repeat(60))
}

// Run tests
runAllTests().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
})
